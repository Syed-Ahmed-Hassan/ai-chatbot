"use client";
import TopBar from "../TopBar/TopBar";
import MessageBox from "./MessageBox";
import ResponseBox from "./ResponseBox";
import React, { useState, useEffect, useRef } from "react";
import { createConversation } from "@/utils/createConversation";
import emitter from "@/utils/eventEmitter";

export default function ChatBot() {
  const conversationId = useRef("");
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [conversationMessages, setConversationMessages] = useState<
    { input: string; output: string }[]
  >([]);

  const handleNewChat = () => {
    setConversationMessages([]);
    setUserInput("");
    setLoading(false);
    createConversation(conversationId);
  };

  useEffect(() => {
    createConversation(conversationId);

    emitter.on("newChatEvent", handleNewChat);

    return () => {
      emitter.off("newChatEvent", handleNewChat);
    };
  }, []);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <TopBar />
      <ResponseBox
        setUserInput={setUserInput}
        setLoading={setLoading}
        setConversationMessages={setConversationMessages}
        conversationMessages={conversationMessages}
        loading={loading}
      />
      <MessageBox
        userInput={userInput}
        setUserInput={setUserInput}
        loading={loading}
        setLoading={setLoading}
        setConversationMessages={setConversationMessages}
        conversationMessages={conversationMessages}
      />
    </div>
  );
}
