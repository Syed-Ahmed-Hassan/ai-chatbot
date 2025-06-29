import React from "react";
import DefaultGreetingText from "./DefaultGreetingText";

export default function DefaultScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full pt-[456px] sm:pt-[192px] px-4">
      <DefaultGreetingText />
    </div>
  );
}
