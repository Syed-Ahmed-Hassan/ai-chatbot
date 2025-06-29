"use client";
import MiniBar from "./MiniBar";
import emitter from "@/utils/eventEmitter";
import React, { useState, useEffect } from "react";
import AiAssistantsToggle from "./AiAssistantsToggle";
import { containerVariants } from "@/constants/animation";
import { motion, useAnimationControls } from "framer-motion";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const containerControls = useAnimationControls();

  const handleSideBarToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }

    emitter.on("sideBarEvent", handleSideBarToggle);

    return () => {
      emitter.off("sideBarEvent", handleSideBarToggle);
    };
  }, [isOpen]);

  return (
    <div className="grid grid-cols-12 sticky h-dvh overflow-auto">
      <div
        className={`${
          isOpen ? "col-span-12 lg:col-span-2" : "col-span-12"
        } h-dvh transition-all duration-300`}
      >
        <MiniBar />
      </div>
      <motion.div
        variants={containerVariants}
        animate={containerControls}
        initial="open"
        className="hidden lg:block col-span-10 overflow-hidden"
      >
        <AiAssistantsToggle />
      </motion.div>
    </div>
  );
}
