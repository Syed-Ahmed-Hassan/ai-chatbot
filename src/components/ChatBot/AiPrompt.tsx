import Image from "next/image";
import ResponseLoader from "../ui/response-loader";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function AiPrompt({ val }: { val: string }) {
  return (
    <div className="flex items-start justify-start gap-1 pb-4">
      <Image
        src="/top-bar-icon.webp"
        alt="side-bar-icon"
        width={26}
        height={26}
      />
      <div className="bg-customSelectedBlockColor p-2 rounded-md">
        {val === "" ? (
          <ResponseLoader />
        ) : (
          <MarkdownPreview
            source={val}
            style={{
              backgroundColor: "transparent",
              fontFamily: "Montserrat",
            }}
          />
        )}
      </div>
    </div>
  );
}
