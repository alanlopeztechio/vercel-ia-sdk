import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    password: v.string(),
    email: v.string(),
  }),
  purchases: defineTable({
    product: v.string(),
    amount: v.number(),
  }),
  complaints: defineTable({
    title: v.string(),
    comment: v.string(),
    idPurchase: v.id("purchases"),
    idUser: v.id("users"),
  })
    .index("by_purchase", ["idPurchase"])
    .index("by_user", ["idUser"]),
  reports: defineTable({
    idComplaint: v.id("complaints"),
    idPurchase: v.id("purchases"),
    solution: v.string(),
  })
    .index("by_complaint", ["idComplaint"])
    .index("by_purchase", ["idPurchase"]),
});

// Tener una tabla con el campo nombre padre nombre alumno, dias que falto y la fecha que falto y el grado que se encuentra el alumno
// despues en el promt generar una carta para cada comentario basado en el siguiente input: ${_formData.commentarios}
// inidicando el nombre del alumno, el grado y los dias que falto y la fecha que falto
// y el json de entrada seria algo asi: { "commentarios": [ "nombreAlumno: Juan Perez, grado: 5to, diasFaltados:
// 3, fechaFaltada: 2024-06-01", "nombreAlumno: Maria Lopez, grado: 3ro, diasFaltados: 2, fechaFaltada: 2024-06-02" ] }
// y el json de salida seria algo asi: { "commentarios": [ "Carta para Juan Perez: Estimado padre de Juan Perez,
// lamentamos informarle que su hijo ha faltado 3 días a clases en el grado 5to, específicamente los días 2024-06-01.
// Por favor, póngase en contacto con la escuela para más información.", "Carta para Maria Lopez: Estimado padre de Maria Lopez,
// lamentamos informarle que su hija ha faltado 2 días a clases en el grado 3ro, específicamente los días 2024-06-02. Por favor,
// póngase en contacto con la escuela para más información." ] }
