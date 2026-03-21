import { projectService } from "~~/server/services/ProjectService";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return projectService.createAsync(body);
})