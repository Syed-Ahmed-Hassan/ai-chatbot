"use client";
import AiPrompt from "./AiPrompt";
import UserPrompt from "./UserPrompt";
import { CustomResponseProps } from "@/lib/types";
import React, { useEffect, useRef } from "react";

export default function CustomResponse({
  conversationMessages,
  loading,
}: CustomResponseProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      // Use instant scrolling during streaming to avoid stuttering
      // Use smooth scrolling only when the response is complete
      endOfMessagesRef.current.scrollIntoView({
        behavior: loading ? "instant" : "smooth",
      });
    }
  }, [conversationMessages, loading]);

  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      {conversationMessages?.map((value, index) => (
        <React.Fragment key={index}>
          <UserPrompt val={value?.input} />
          <AiPrompt val={value?.output} />
        </React.Fragment>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
