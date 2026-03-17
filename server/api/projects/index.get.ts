import { projectService } from "~~/server/services/ProjectService";

export default defineEventHandler(async (event) => {
    const { limit } = getQuery(event);
    return projectService.getAllAsync(limit ? Number(limit): undefined)
})