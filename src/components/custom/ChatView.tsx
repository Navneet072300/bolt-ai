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

const ChatView = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState<string>("");

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
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll">
        {messages?.map((msg: any, index: any) => (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            key={index}
            style={{ backgroundColor: Color.CHAT_BACKGROUND }}
          >
            {msg?.role == "user" && (
              <Image
                src={userDetail?.picture}
                alt="UserImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <h2 className="">{msg.content}</h2>
          </div>
        ))}
      </div>

      <div className=" bg-[#101923] p-5 border rounded-xl max-w-xl w-full mt-3">
        <div className="flex gap-3">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize"
          />
          {userInput && (
            <ArrowRight className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer" />
          )}
        </div>
        <div className="">
          <Link className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
