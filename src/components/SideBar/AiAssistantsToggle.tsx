import React from "react";
import Image from "next/image";
import { Label } from "../ui/label";
import emitter from "@/utils/eventEmitter";
import { MessageSquareDiff } from "lucide-react";

export default function AiAssistantsToggle() {
  const handleNewChat = () => {
    emitter.emit("newChatEvent");
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 gap-4 bg-customSecondaryBackground border-r border-customPrimaryBorderColor h-dvh">
      <div className="flex items-center justify-between w-full">
        <Label className="text-lg font-bold">HatchProof Chatbot</Label>
        <button onClick={handleNewChat} className="cursor-pointer">
          <MessageSquareDiff className="text-customIconColor" />
        </button>
      </div>

      <div className="flex items-center justify-start py-2 px-4 gap-2 bg-customSelectedBlockColor w-full rounded-sm">
        <Image
          src="/top-bar-icon.webp"
          alt="side-bar-icon"
          width={36}
          height={36}
        />
        <Label className="text-sm text-white font-semibold">Just Chat</Label>
      </div>
    </div>
  );
}
