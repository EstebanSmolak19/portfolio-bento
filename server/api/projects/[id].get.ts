import { projectService } from "~~/server/services/ProjectService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    return projectService.getAsync(id);
})