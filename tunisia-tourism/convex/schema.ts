import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  guides: defineTable({
    name: v.string(),
    avatar: v.string(),
    location: v.string(),
    languages: v.array(v.string()),
    specialties: v.array(v.string()),
    rating: v.number(),
    reviews: v.number(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  bookings: defineTable({
    userId: v.string(),
    guideId: v.id("guides"),
    date: v.string(),
    status: v.string(),
  }).index("by_user_id", ["userId"]),
});