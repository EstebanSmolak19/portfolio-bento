import type { Project } from "~/types/Project";

export interface IProjectRepository {
    // Récupère tous les projets
    getAllAsync(limit?: number) : Promise<Project[]>;

    //Récupère un projet en fonction de son ID
    getAsync(project_id: number): Promise<Project|null>;

    //Créer un projet (API Github)
    createProject(link: string): Promise<Project>;
}