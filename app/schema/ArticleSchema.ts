import z from "zod";

export const ArticleSchema = z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    score: z.number(),
    author: z.string(),
    url: z.string().url(),
    published_at: z.string(),
})