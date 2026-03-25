import { experienceService } from "~~/server/services/ExperienceService";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return experienceService.createAsync(body);
})