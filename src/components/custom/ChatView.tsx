/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useContext, useEffect, useState } from "react";
import type { Id } from "../../../convex/_generated/dataModel";
import { MessagesContext } from "@/context/MessageContext";
import Color from "@/data/Color";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import { ArrowRight, Link } from "lucide-react";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";

const ChatView = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const convex = useConvex();

  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState<string>("");

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
    }
  };

  useEffect(() => {
    if (messages?.length) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    const prompt = JSON.stringify(messages) + Prompt.CHAT_PROMPT;

    try {
      const response = await axios.post("/api/ai-chat", { prompt });
      const aiMessage = response.data.result;

      setMessages((prev: any[]) => [
        ...prev,
        {
          role: "ai",
          content: aiMessage,
        },
      ]);
    } catch (error) {
      console.error("AI response error:", error);
    }
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    setMessages((prev: any[]) => [
      ...prev,
      {
        role: "user",
        content: userInput.trim(),
      },
    ]);
    setUserInput("");
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll px-4">
        {messages?.map((msg: any, index: number) => (
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
                alt="UserImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <h2 className="text-white">{msg.content}</h2>
          </div>
        ))}
      </div>

      <div className="bg-[#101923] p-5 border rounded-xl max-w-xl w-full mt-3 mx-auto">
        <div className="flex gap-3 items-end">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white"
          />
          {userInput && (
            <ArrowRight
              onClick={handleSend}
              className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer hover:bg-blue-600 transition"
            />
          )}
        </div>
        <div className="mt-2 flex justify-end">
          <Link className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
