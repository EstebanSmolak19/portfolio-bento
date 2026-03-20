import type { Categorie } from "~/types/Categorie";

export interface ICategoriesRepository {
    // Récupère toutes les catégories
    getAllAsync(limit?: number) : Promise<Categorie[]>;

    //Récupère une categorie en fonction de son ID
    getAsync(categorie_id: number): Promise<Categorie|null>;
}