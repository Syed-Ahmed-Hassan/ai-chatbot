"use client";
import DefaultScreen from "./DefaultScreen";
import CustomResponse from "./CustomResponse";
import { ResponseBoxProps } from "@/lib/types";

export default function ResponseBox({
  conversationMessages,
  loading,
}: Omit<ResponseBoxProps, "conversationId">) {
  return (
    <div className="flex flex-1 overflow-auto w-full max-w-full min-w-0">
      {conversationMessages.length === 0 ? (
        <DefaultScreen />
      ) : (
        <CustomResponse
          conversationMessages={conversationMessages}
          loading={loading}
        />
      )}
    </div>
  );
}
