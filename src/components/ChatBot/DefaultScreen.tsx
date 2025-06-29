import React from "react";
import DefaultGreetingText from "./DefaultGreetingText";

export default function DefaultScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full  px-4">
      <DefaultGreetingText />
    </div>
  );
}
