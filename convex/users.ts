import { query } from './_generated/server';
import { v } from 'convex/values';

export const getComments = query({
  handler: async (ctx) => {
    return ctx.db.query('usuarios').collect();
  },
});
