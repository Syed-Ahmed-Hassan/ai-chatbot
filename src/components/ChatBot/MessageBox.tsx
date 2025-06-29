"use client";

import React from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { MessageBoxProps } from "@/lib/types";
import CustomBlock from "../ui/custom-block";
import { handleAutomateTranslate } from "@/utils/aiConversation";

export default function MessageBox({
  userInput,
  setUserInput,
  loading,
  setLoading,
  setConversationMessages,
  conversationMessages,
}: Omit<MessageBoxProps, "conversationId">) {
  const handleOnChange = (value: string) => {
    setUserInput(value);
  };

  const handleOnSubmit = () => {
    if (userInput.trim() === "") {
      toast.error("Message is required!");
      return;
    }

    handleAutomateTranslate(
      userInput,
      setUserInput,
      setLoading,
      setConversationMessages,
      conversationMessages
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmit();
    }
  };

  return (
    <div className="flex flex-col border-t border-customPrimaryBorderColor min-h-[80px]">
      <Textarea
        value={userInput}
        onChange={(e) => handleOnChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        disabled={loading}
      />
      <div className="flex items-center justify-end p-3">
        <CustomBlock
          as="button"
          className="capitalize"
          color="cyan"
          speed="5s"
          onClick={handleOnSubmit}
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : "submit"}
        </CustomBlock>
      </div>
    </div>
  );
}
