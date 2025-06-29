import React from "react";
import Image from "next/image";
import { Label } from "../ui/label";
import emitter from "@/utils/eventEmitter";
import { PanelLeftClose } from "lucide-react";

export default function TopBar() {
  const handleClose = () => {
    emitter.emit("sideBarEvent");
  };
  return (
    <div className="hidden md:flex items-center justify-between w-full min-h-16 px-4 border-b border-customPrimaryBorderColor ">
      <div className="flex items-center justify-start gap-1">
        <div className="w-9 h-9 hidden lg:flex items-center justify-center">
          <PanelLeftClose
            className="text-customIconColor cursor-pointer text-lg"
            onClick={handleClose}
          />
        </div>
        <Image
          src="/top-bar-icon.webp"
          alt="side-bar-icon"
          width={32}
          height={32}
          className="min-w-[32px] min-h-[32px]"
        />
        <div className="flex flex-col items-start justify-start">
          <Label className="text-sm font-bold text-white">Just Chat</Label>
          <Label className="text-xs text-customSecondaryTextColor">
            Activate the brain cluster and spark creative thinking. Your virtual
            assistant is here to communicate with you about everything.
          </Label>
        </div>
      </div>
    </div>
  );
}
