// reportes
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getReport = query({
  handler: async (ctx) => {
    return ctx.db.query("reports").collect();
  },
});

export const createReport = mutation({
  args: {
    idComplaint: v.id("complaints"),
    idPurchase: v.id("purchases"),
    solution: v.string(),
  },
  handler: async (ctx, args) => {
    // consultar para saber si existe el reclamo con el id que se recibio
    const complaint = await ctx.db.query("complaints").filter((q) => {
      return q.eq(q.field("_id"), args.idComplaint);
    });
    const purchase = await ctx.db.query("purchases").filter((q) => {
      return q.eq(q.field("_id"), args.idPurchase);
    });

    // verificamos que si existen despues de la consulta
    if (!complaint)
      throw new ConvexError(
        "Error al crear el reporte, no se encontro el id de la reclamo",
      );
    if (!purchase)
      throw new ConvexError(
        "Error al crear el reporte, no se encontro el id de la compra",
      );

    const id = ctx.db.insert("reports", {
      idComplaint: args.idComplaint,
      idPurchase: args.idPurchase,
      solution: args.solution,
    });
    return id;
  },
});

export const updateReport = mutation({
  args: {
    id: v.id("reports"),
    solution: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args; // campos = args sin id
    const report = await ctx.db.get(id);
    if (!report)
      throw new ConvexError("Error al editar, no se encontro el reporte");
    await ctx.db.patch(id, fields);
  },
});

export const deleteReport = mutation({
  args: {
    id: v.id("reports"),
  },
  handler: async (ctx, args) => {
    const report = await ctx.db.get(args.id);
    if (!report)
      throw new ConvexError("Error al eliminar, no se encontro el reporte");
    await ctx.db.delete(args.id);
  },
});
