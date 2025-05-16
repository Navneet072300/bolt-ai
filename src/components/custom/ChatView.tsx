/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useContext, useEffect } from "react";
import type { Id } from "../../../convex/_generated/dataModel";
import { MessagesContext } from "@/context/MessageContext";

const ChatView = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);

  useEffect(() => {
    if (id) {
      GetWorkspaceData(id as Id<"workspace">);
    }
  }, [id]);

  const GetWorkspaceData = async (workspaceId: Id<"workspace">) => {
    const result = await convex.query(api.workspace.GetWorkspaceData, {
      workspaceId,
    });
    setMessages(result?.message);
    console.log(result);
  };

  return (
    <div className="">
      <div className="">
        {messages?.map((msg: any, index: any) => (
          <div className="" key={index}>
            <h2 className="">{msg.content}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatView;
