import { projectService } from "~~/server/services/ProjectService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const body = await readBody(event);
    return projectService.updateAsync(id, body);
})