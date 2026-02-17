// compras
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getPurchase = query({
  handler: async (ctx) => {
    return ctx.db.query("purchases").collect();
  },
});

export const createPurchase = mutation({
  args: {
    product: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const id = ctx.db.insert("purchases", {
      product: args.product,
      amount: args.amount,
    });
    return id;
  },
});

export const updatePurchase = mutation({
  args: {
    id: v.id("purchases"),
    product: v.optional(v.string()),
    amount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args; // campos = args sin id
    const purchase = await ctx.db.get(id);
    if (!purchase)
      throw new ConvexError("Error al editar, no se encontro la compra");
    await ctx.db.patch(id, fields);
  },
});

export const deletePurchase = mutation({
  args: {
    id: v.id("purchases"),
  },
  handler: async (ctx, args) => {
    const purchase = await ctx.db.get(args.id);
    if (!purchase)
      throw new ConvexError("Error al eliminar, no se encontro la compra");
    await ctx.db.delete(args.id);
  },
});
