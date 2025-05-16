import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkspace = mutation({
  args: {
    message: v.any(),
    user: v.id("user"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      message: args.message,
      user: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkspaceData = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});
