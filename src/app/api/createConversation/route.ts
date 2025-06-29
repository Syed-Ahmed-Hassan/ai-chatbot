import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST() {
  try {
    // Grok API doesn't require separate conversation creation
    // We'll generate a simple session ID for local conversation tracking
    const sessionId = randomUUID();

    return NextResponse.json({
      data: {
        session_id: sessionId,
      },
    });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json({ error: "Failed to create session" });
  }
}
