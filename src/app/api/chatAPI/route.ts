import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { inputCode, model, conversationHistory = [] } = await req.json();
  const start = Date.now();

  const userMessage = inputCode;
  const chatModel = model;

  // Groq Cloud API endpoint
  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

  const headers = {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    "Content-Type": "application/json",
  };

  // Build conversation history with proper role alternation
  const messages = [];

  // Add conversation history (excluding the current message which is already being added)
  for (const msg of conversationHistory) {
    if (msg.input && msg.output) {
      messages.push({
        role: "user",
        content: msg.input,
      });
      messages.push({
        role: "assistant",
        content: msg.output,
      });
    }
  }

  // Add the current user message
  messages.push({
    role: "user",
    content: userMessage,
  });

  const payload = {
    model: chatModel,
    messages,
    stream: true,
    temperature: 0.7,
  };

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    try {
      console.log(`Attempt ${attempt} to fetch Groq API.`);
      noStore();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (response.status === 403) {
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
          continue;
        } else {
          throw new Error("Max retries reached for status 403.");
        }
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Create a ReadableStream to handle the streaming response
      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              buffer += chunk;
              const lines = buffer.split("\n");

              buffer = lines.pop() || "";

              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const data = line.replace("data: ", "").trim();

                  if (data === "[DONE]") {
                    controller.close();
                    return;
                  }

                  try {
                    const parsedData = JSON.parse(data);
                    const content = parsedData.choices?.[0]?.delta?.content;

                    if (content) {
                      controller.enqueue(new TextEncoder().encode(content));
                    }
                  } catch (err) {
                    console.error(
                      "Failed to parse JSON:",
                      err instanceof Error ? err.message : "Unknown error",
                      data
                    );
                  }
                }
              }
            }

            if (buffer) {
              try {
                const data = buffer.replace("data: ", "").trim();
                if (data && data !== "[DONE]") {
                  const parsedData = JSON.parse(data);
                  const content = parsedData.choices?.[0]?.delta?.content;

                  if (content) {
                    controller.enqueue(new TextEncoder().encode(content));
                  }
                }
              } catch (err) {
                console.error(
                  "Failed to parse leftover JSON:",
                  err instanceof Error ? err.message : "Unknown error",
                  buffer
                );
              }
            }

            controller.close();
          }
        },
      });

      // Return a Response object with the ReadableStream
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-LLM-Start": `${start}`,
          "X-LLM-Response": `${Date.now()}`,
        },
      });
    } catch (error) {
      console.error(`Error on attempt ${attempt}:`, error);

      if (attempt === maxRetries) {
        return new Response("An error occurred after max retries", {
          status: 500,
        });
      }
    }
  }
}
