// reclamos
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getComplaint = query({
  handler: async (ctx) => {
    return ctx.db.query("complaints").collect();
  },
});

export const createComplaint = mutation({
  args: {
    comments: v.string(),
    idPurchase: v.id("purchases"),
    idUser: v.id("users"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    // primero obtengo los datos de las llaves foraneas
    const purchase = await ctx.db.query("purchases").filter((q) => {
      return q.eq(q.field("_id"), args.idPurchase);
    });
    const user = await ctx.db.query("users").filter((q) => {
      return q.eq(q.field("_id"), args.idUser);
    });

    // verificamos que si existen despues de la consulta
    if (!purchase)
      throw new ConvexError(
        "Error al crear el reclamo, no se encontro el id de la compra",
      );
    if (!user)
      throw new ConvexError(
        "Error al crear el reclamo, no se encontro el id del usuario",
      );

    const id = ctx.db.insert("complaints", {
      comment: args.comments,
      idPurchase: args.idPurchase,
      idUser: args.idUser,
      title: args.title,
    });
    return id;
  },
});

export const updateComplaint = mutation({
  args: {
    id: v.id("complaints"),
    title: v.string(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...campos } = args; // campos = args sin id
    const complaint = await ctx.db.get(id);
    if (!complaint)
      throw new ConvexError("Error al actualizar, el reclamo no existe");
    await ctx.db.patch(id, campos);
  },
});

export const deleteComplaint = mutation({
  args: {
    id: v.id("complaints"),
  },
  handler: async (ctx, args) => {
    const complaint = await ctx.db.get(args.id);
    if (!complaint)
      throw new ConvexError("Error al eliminar, no se encontro el reclamo");
    await ctx.db.delete(args.id);
  },
});
