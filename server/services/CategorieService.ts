import { Categorie } from "~/types/Categorie";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { CreateCategoryDto } from "~/types/DTO/CreateCategoryDto";
import { GenericService } from "./GenericService";

class CategorieService extends GenericService<Categorie, CreateCategoryDto>
  implements ICategoriesRepository {

    constructor() {
      super('categories');
    }

    async resolvedCategoryId(name: string): Promise<number> {
      const { data, error } = await useSupabase()
        .from('categories')
        .upsert({ name, color: "white"}, { onConflict: 'name' })
        .select('id')
        .single();

        if (error) throw createError({ statusCode: 404, message: `Catégorie "${name}" introuvable` })
        return data.id
    }
}

export const categorieService = new CategorieService();