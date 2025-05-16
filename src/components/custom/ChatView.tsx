"use client";

import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";
import type { Id } from "../../../convex/_generated/dataModel";

const ChatView = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const convex = useConvex();

  useEffect(() => {
    if (id) {
      GetWorkspaceData(id as Id<"workspace">);
    }
  }, [id]);

  const GetWorkspaceData = async (workspaceId: Id<"workspace">) => {
    const result = await convex.query(api.workspace.GetWorkspaceData, {
      workspaceId,
    });
    console.log(result);
  };

  return <div>ChatView</div>;
};

export default ChatView;
