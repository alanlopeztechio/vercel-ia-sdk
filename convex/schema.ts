import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  usuarios: defineTable({
    name: v.string(),
    comments: v.string(),
    date: v.string(),
  }),
  padres: defineTable({
    nameFather: v.string(),
    nameStudent: v.string(),
    absentDays: v.number(),
    dateAbsent: v.number(),
    grade: v.string(),
  }),
});
