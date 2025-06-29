import Image from "next/image";
import { Label } from "../ui/label";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function UserPrompt({ val }: { val: string }) {
  return (
    <div className="flex items-start justify-end gap-1 w-full">
      <div className="bg-customSelectedBlockColor p-2 rounded-md max-w-full min-w-0 overflow-hidden">
        <Label className="text-white text-sm">
          <MarkdownPreview
            source={val}
            style={{
              backgroundColor: "transparent",
              fontFamily: "Montserrat",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          />
        </Label>
      </div>
      <Image
        src="/side-bar-icon.png"
        alt="side-bar-icon"
        width={26}
        height={26}
        className="flex-shrink-0"
      />
    </div>
  );
}
