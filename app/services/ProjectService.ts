import type { Project } from "~/types/Project";

class ProjectService {

    async getAllAsync(limit?: number): Promise<Project[]> {
        return $fetch('/api/projects', {query: { limit }})
    }

    async getAsync(id: number): Promise<Project|null> {
        return $fetch(`/api/projects/${id}`)
    }

    async createProject(link: string): Promise<Project> {
        return $fetch('/api/projects', {
            method: 'POST',
            body: { link }
        })
    }
}

export const projectService = new ProjectService();