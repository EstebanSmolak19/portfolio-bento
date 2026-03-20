import type { Article } from "~/types/Article";
import type { CreateArticleDto } from "~/types/DTO/CreateArticleDto";

export interface IArticleRepository {
    // Récupère tous les articles
    getAllAsync(limit?: number) : Promise<Article[]>;

    //Récupère un article en fonction de son ID
    getAsync(project_id: number): Promise<Article|null>;

    // Créer un article
    createAsync(dto: CreateArticleDto): Promise<Article>;
}