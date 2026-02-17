import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUsers = query({
  handler: async (ctx) => {
    return ctx.db.query("users").collect();
  },
});

export const createtUser = mutation({
  // insertar registro en tabla usuarios
  args: {
    name: v.string(),
    password: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const id = ctx.db.insert("users", {
      name: args.name,
      password: args.password,
      email: args.email,
    });
    return id;
  },
});

export const updateUser = mutation({
  // editar parcialmente el registro, utilizar replace para el registro completo
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    password: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args; // campos = args sin id
    const user = await ctx.db.get(id);
    if (!user) throw new ConvexError("El usuario no fue encontrado");
    await ctx.db.patch(id, fields);
  },
});

export const deleteUser = mutation({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user)
      throw new ConvexError("Error al eliminar, no se encontro el usuario");
    await ctx.db.delete(args.id);
  },
});
