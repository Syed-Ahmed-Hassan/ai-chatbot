"use client";
import SideBar from "../SideBar";
import ChatBot from "../ChatBot";
import emitter from "@/utils/eventEmitter";
import React, { useState, useEffect } from "react";

export default function LayOut() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSideBarToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    emitter.on("sideBarEvent", handleSideBarToggle);

    return () => {
      emitter.off("sideBarEvent", handleSideBarToggle);
    };
  }, [isOpen]);

  return (
    <div
      className={`grid ${
        isOpen
          ? "grid-cols-[64px,_1fr] lg:grid-cols-[350px,_1fr]"
          : "grid-cols-[64px,_1fr]"
      } h-dvh overflow-hidden transition-all duration-300`}
    >
      <SideBar />
      <ChatBot />
    </div>
  );
}
