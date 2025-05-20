/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useContext, useEffect, useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { MessagesContext } from "@/context/MessageContext";
import Color from "@/data/Color";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import { toast } from "sonner";

interface Message {
  role: "user" | "ai";
  content: string;
}

const ChatView = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const convex = useConvex();

  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      GetWorkspaceData(id as Id<"workspace">);
    }
  }, [id]);

  const GetWorkspaceData = async (workspaceId: Id<"workspace">) => {
    try {
      const result = await convex.query(api.workspace.GetWorkspaceData, {
        workspaceId,
      });
      setMessages(result?.message || []);
    } catch (err) {
      console.error("Failed to fetch workspace data:", err);
      toast.error("Failed to load chat history");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GetAiResponse = async () => {
    setLoading(true);
    const prompt = JSON.stringify(messages) + Prompt.CHAT_PROMPT;

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      let aiMessage = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiMessage += new TextDecoder().decode(value);
        setMessages((prev: Message[]) => [
          ...prev.filter(
            (msg) => msg.role !== "ai" || msg.content !== aiMessage
          ), // Avoid duplicates
          { role: "ai", content: aiMessage },
        ]);
      }

      setLoading(false);
    } catch (error) {
      console.error("AI response error:", error);
      toast.error("Failed to get AI response");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      GetAiResponse();
    }
  }, [messages, GetAiResponse]);

  const handleSend = () => {
    if (!userInput.trim()) return;

    setMessages((prev: Message[]) => [
      ...prev,
      { role: "user", content: userInput.trim() },
    ]);
    setUserInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll px-4">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg: Message, index: number) => (
            <div
              key={index}
              className={`p-3 rounded-lg mb-2 flex gap-2 items-start ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
              style={{ backgroundColor: Color.CHAT_BACKGROUND }}
            >
              {msg.role === "user" && userDetail?.picture && (
                <Image
                  src={userDetail.picture}
                  alt="User profile picture"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <h2 className="text-white">{msg.content}</h2>
            </div>
          ))
        )}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center"
            style={{ backgroundColor: Color.CHAT_BACKGROUND }}
          >
            <Loader2Icon className="animate-spin" />
            <h2 className="text-white">Generating Response...</h2>
          </div>
        )}
      </div>

      <div className="bg-[#101923] p-5 border rounded-xl max-w-xl w-full mt-3 mx-auto">
        <div className="flex gap-3 items-end">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white"
            aria-label="Chat input"
          />
          {userInput && (
            <button
              onClick={handleSend}
              className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer hover:bg-blue-600 transition"
              aria-label="Send message"
            >
              <ArrowRight />
            </button>
          )}
        </div>
        <div className="mt-2 flex justify-end">
          <Link className="h-5 w-5 text-gray-400" aria-label="Link icon" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
