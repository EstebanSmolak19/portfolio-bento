import { experienceService } from "~~/server/services/ExperienceService";

export default defineEventHandler(async (event) => {
    const { limit } = getQuery(event);
    return experienceService.getAllAsync(limit ? Number(limit): undefined)
})