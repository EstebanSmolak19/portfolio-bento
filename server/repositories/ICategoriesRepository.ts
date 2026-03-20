import type { Categorie } from "~/types/Categorie";
import type { CreateCategoryDto } from "~/types/DTO/CreateCategoryDto";

export interface ICategoriesRepository {
    // Récupère toutes les catégories
    getAllAsync(limit?: number) : Promise<Categorie[]>;

    //Récupère une categorie en fonction de son ID
    getAsync(categorie_id: number): Promise<Categorie|null>;

    //Créer une catégorie.
    createAsync(dto: CreateCategoryDto): Promise<Categorie>;

    //Retourne l'id d'une categorie si elle existe en base
    resolvedCategoryId(name: string): Promise<number>
}