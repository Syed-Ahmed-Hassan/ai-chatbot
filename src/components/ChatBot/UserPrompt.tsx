import Image from "next/image";
import { Label } from "../ui/label";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function UserPrompt({ val }: { val: string }) {
  return (
    <div className="flex items-start justify-end gap-1">
      <div className="bg-customSelectedBlockColor p-2 rounded-md">
        <Label className="text-white text-sm">
          <MarkdownPreview
            source={val}
            style={{
              backgroundColor: "transparent",
              fontFamily: "Montserrat",
            }}
          />
        </Label>
      </div>
      <Image
        src="/side-bar-icon.png"
        alt="side-bar-icon"
        width={26}
        height={26}
      />
    </div>
  );
}
