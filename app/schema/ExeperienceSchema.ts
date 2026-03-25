import z from "zod";

export const ExperienceSchema = z.object({
    company: z.string(),
    role: z.string(),
    year: z.string(),
    duration: z.string(),
    type: z.string(),
    location: z.string(),
    description: z.string(),
    stack: z.string(),
    skills: z.string(),
    context: z.string(),
    missions: z.string(),
    order: z.string(),
})

