import { skillService } from "~~/server/services/SkillService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const body = await readBody(event);
    return skillService.updateAsync(id, body);
})