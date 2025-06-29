import React from "react";
import Image from "next/image";
import emitter from "@/utils/eventEmitter";
import { MessageSquare, MessageSquareDiff } from "lucide-react";

export default function MiniBar() {
  const handleNewChat = () => {
    emitter.emit("newChatEvent");
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 gap-4 bg-customSecondaryBackground border-r border-customPrimaryBorderColor h-dvh">
      <Image
        src="/side-bar-icon.png"
        alt="side-bar-icon"
        width={38}
        height={38}
        className="min-w-[38px] min-h-[38px]"
      />
      <button
        onClick={handleNewChat}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-customSelectedBackground text-customSelectedIconColor cursor-pointer"
      >
        <MessageSquareDiff />
      </button>
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-customSelectedBackground text-customSelectedIconColor cursor-pointer">
        <MessageSquare />
      </div>
    </div>
  );
}
