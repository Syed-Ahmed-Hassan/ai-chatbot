import { Dispatch, RefObject, SetStateAction } from "react";

export type OpenAIModel =
  | "llama-3.1-8b-instant"
  | "llama-3.1-70b-versatile"
  | "mixtral-8x7b-32768"
  | "gemma2-9b-it";

export interface ChatBody {
  inputCode: string;
  model: OpenAIModel;
  conversationId?: string;
  conversationHistory: { input: string; output: string }[];
}

export type DefaultScreenProps = {
  conversationId: RefObject<string>;
  setConversationMessages: Dispatch<
    SetStateAction<{ input: string; output: string }[]>
  >;
  setUserInput: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export interface MessageBoxProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setConversationMessages: React.Dispatch<
    React.SetStateAction<{ input: string; output: string }[]>
  >;
  conversationId: React.RefObject<string>;
  conversationMessages: { input: string; output: string }[];
}

export type CustomResponseProps = {
  conversationMessages: { input: string; output: string }[];
  loading: boolean;
};

export interface ResponseBoxProps {
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setConversationMessages: React.Dispatch<
    React.SetStateAction<{ input: string; output: string }[]>
  >;
  conversationId: React.RefObject<string>;
  conversationMessages: { input: string; output: string }[];
  loading: boolean;
}
