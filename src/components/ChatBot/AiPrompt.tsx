import Image from "next/image";
import ResponseLoader from "../ui/response-loader";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function AiPrompt({ val }: { val: string }) {
  return (
    <div className="flex items-start justify-start gap-1 pb-4 w-full">
      <Image
        src="/top-bar-icon.webp"
        alt="side-bar-icon"
        width={26}
        height={26}
        className="flex-shrink-0"
      />
      <div className="bg-customSelectedBlockColor p-2 rounded-md max-w-full min-w-0  overflow-hidden">
        {val === "" ? (
          <ResponseLoader />
        ) : (
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
        )}
      </div>
    </div>
  );
}
