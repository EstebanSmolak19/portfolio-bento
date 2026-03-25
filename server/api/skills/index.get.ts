import { skillService } from "~~/server/services/SkillService";

export default defineEventHandler(async (event) => {
    const { limit } = getQuery(event);
    return skillService.getAllAsync(limit ? Number(limit): undefined)
})