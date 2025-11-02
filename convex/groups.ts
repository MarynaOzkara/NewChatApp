import {query } from "./_generated/server.js";
export const get = query({
    args: {},
    handler: async (ctx) => {
        const groups = await ctx.db.query("groups").collect();
        return groups;
    }
})