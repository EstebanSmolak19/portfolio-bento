import type { Project } from "~/types/Project";
import { GenericService } from "./GenericService";
import type { CreateProjectDto } from "~/types/DTO/CreateProjectDto";

class ProjectService extends GenericService<Project, CreateProjectDto> {
    constructor() {
        console.log('oui');
        super('/projects')
    }
}

export const projectService = new ProjectService();