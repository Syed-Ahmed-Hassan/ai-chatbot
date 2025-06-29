import React from "react";
import Image from "next/image";
import { Label } from "../ui/label";
import { getGreeting } from "@/utils/getGreeting";

const DefaultGreetingText = () => {
  return (
    <>
      <div className="flex items-end justify-center gap-2">
        <Image
          src="/response-box-icon.webp"
          alt="response-box-icon"
          width={40}
          height={40}
          unoptimized
        />
        <Label className="text-white text-3xl font-bold">{getGreeting()}</Label>
      </div>

      <Label className="text-sm">
        I am your personal intelligent assistant HatchProof. How can I assist
        you today?
      </Label>
    </>
  );
};

export default DefaultGreetingText;
