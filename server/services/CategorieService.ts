import { Categorie } from "~/types/Categorie";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

class CategorieService implements ICategoriesRepository {

    async getAllAsync(limit?: number): Promise<Categorie[]> {
        const query = useSupabase()
          .from('categories')
          .select('*')
          .order('id', { ascending: false });
    
        if (limit) query.limit(limit);
    
        const { data, error } = await query;
        if (error) throw createError({ statusCode: 500, message: error.message });
        return data as Categorie[];
      }
    
    async getAsync(categorie_id: number): Promise<Categorie | null> {
        const { data, error } = await useSupabase()
          .from('categories')
          .select('*')
          .eq('id', categorie_id)
          .single();
    
        if (error) throw createError({ statusCode: 404, message: 'Categorie introuvable' });
        return data as Categorie;
      }
}

export const categorieService = new CategorieService();