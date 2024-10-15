import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getGuides = query({
  handler: async (ctx) => {
    return await ctx.db.query("guides").collect();
  },
});

export const addGuide = mutation({
  args: {
    name: v.string(),
    avatar: v.string(),
    location: v.string(),
    languages: v.array(v.string()),
    specialties: v.array(v.string()),
    rating: v.number(),
    reviews: v.number(),
  },
  handler: async (ctx, args) => {
    const guideId = await ctx.db.insert("guides", args);
    return guideId;
  },
});