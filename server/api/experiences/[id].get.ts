import { experienceService } from "~~/server/services/ExperienceService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    return experienceService.getAsync(id);
})