import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getComments = query({
  handler: async (ctx) => {
    return ctx.db.query("usuarios").collect();
  },
});
