import {mutation, query } from "./_generated/server.js";
import { v } from "convex/values";
export const get = query({
    args: {},
    handler: async (ctx) => {
        const groups = await ctx.db.query("groups").collect();

        return groups;
    }
})

export const getGroup = query({
    args: {id: v.id("groups")},
    handler: async (ctx, {id}) => {
        const groups = await ctx.db.query("groups")
        .filter((q) => q.eq(q.field("_id"), id))
        .unique()

        return groups;
    }
})

export const create = mutation({
    args: {description: v.string(), icon_url: v.string(), name: v.string()},
    handler: async (ctx, {description, icon_url, name}) => {
        const groupId = await ctx.db.insert("groups", {
            description,
            icon_url,
            name,
        }); 
        return groupId;
    }
})