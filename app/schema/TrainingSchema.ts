import z from "zod";

export const TrainingSchema = z.object({
    years: z.string(),
    shortName: z.string(),
    type: z.string(),
    title: z.string(),
    school: z.string(),
    location: z.string(),
    status: z.string(),
    description: z.string(),
})
