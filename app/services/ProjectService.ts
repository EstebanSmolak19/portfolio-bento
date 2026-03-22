import type { Project } from "~/types/Project";
import { GenericService } from "./GenericService";
import type { CreateProjectDto } from "~/types/DTO/CreateProjectDto";

class ProjectService extends GenericService<Project, CreateProjectDto> {
    constructor() {
        super('/projects')
    }

    /**
     * Récupère le projet mis en avant sur la première page du portfolio.
    */
    async getFeaturedProject(): Promise<Project|null> {
        const data = await $fetch(`${this.BaseUrl}/featured`);
        return data as Project|null;
    }
}

export const projectService = new ProjectService();