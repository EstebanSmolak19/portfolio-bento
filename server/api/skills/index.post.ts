import { skillService } from "~~/server/services/SkillService";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return skillService.createAsync(body);
})