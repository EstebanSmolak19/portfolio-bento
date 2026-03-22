import z from "zod";

export const SkillSchema = z.object({
    name: z.string(),
    icon: z.string(),
    level: z.coerce.number().min(0).max(100),
})