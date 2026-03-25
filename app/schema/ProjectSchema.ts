import z from "zod";

export const ProjectSchema = z.object({
    link: z.string().url().or(z.literal('')),
})