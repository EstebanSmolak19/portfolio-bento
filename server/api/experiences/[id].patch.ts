import { experienceService } from "~~/server/services/ExperienceService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const body = await readBody(event);
    return experienceService.updateAsync(id, body);
})