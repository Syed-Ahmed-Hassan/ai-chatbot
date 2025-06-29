import { model } from "@/constants/models";
import { ChatBody } from "@/lib/types";

export const handleAutomateTranslate = async (
  text: string,
  setUserInput: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setConversationMessages: React.Dispatch<
    React.SetStateAction<{ input: string; output: string }[]>
  >,
  conversationHistory: { input: string; output: string }[] = []
) => {
  setUserInput(text);
  setLoading(true);
  setConversationMessages((prevMessages) => [
    ...prevMessages,
    { input: text, output: "" },
  ]);

  const controller = new AbortController();
  const body: ChatBody = {
    inputCode: text,
    model,
    conversationHistory,
  };

  const response = await fetch("/api/chatAPI", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    setLoading(false);
    alert("Something went wrong with the API.");
    return;
  }

  const data = response.body;
  if (!data) {
    setLoading(false);
    alert("Something went wrong");
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let output = "";

  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    output += chunkValue;

    setConversationMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const lastMessageIndex = updatedMessages.length - 1;

      if (lastMessageIndex >= 0) {
        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          output: output,
        };
      }

      return updatedMessages;
    });
  }

  setUserInput("");
  setLoading(false);
};
