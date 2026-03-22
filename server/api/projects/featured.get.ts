import { projectService } from "~~/server/services/ProjectService";

export default defineEventHandler(async (event) => {
    return projectService.getFirstPageProject();
})
