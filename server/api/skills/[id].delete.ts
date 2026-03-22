import { skillService } from "~~/server/services/SkillService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    return skillService.deleteAsync(id);
})