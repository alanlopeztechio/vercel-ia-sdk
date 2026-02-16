import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createFather = mutation({
  args: {
    nameFather: v.string(),
    nameStudent: v.string(),
    absentDays: v.number(),
    dateAbsent: v.number(),
    grade: v.string(),
  },
  handler: async (ctx, args) => {
    const newFatherId = await ctx.db.insert("padres", {
      nameFather: args.nameFather,
      nameStudent: args.nameStudent,
      absentDays: args.absentDays,
      dateAbsent: args.dateAbsent,
      grade: args.grade,
    });
    return newFatherId;
  },
});
