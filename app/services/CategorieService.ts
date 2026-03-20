import type { Categorie } from "~/types/Categorie";

class CategorieService {

    async getAllAsync(limit?: number): Promise<Categorie[]> {
        return $fetch('/api/categories', {query: { limit }})
    }

    async getAsync(id: number): Promise<Categorie|null> {
        return $fetch(`/api/categories/${id}`)
    }
}

export const categorieService = new CategorieService();