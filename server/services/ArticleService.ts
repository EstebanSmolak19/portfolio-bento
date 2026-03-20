import { Article } from "~/types/Article";
import { IArticleRepository } from "../repositories/IArticlesRepository";
import { CreateArticleDto } from "~/types/DTO/CreateArticleDto";
import { categorieService } from "./CategorieService";

class ArticleService implements IArticleRepository {

    async getAllAsync(limit?: number): Promise<Article[]> {
        const query = useSupabase()
          .from('articles')
          .select('*')
          .order('id', { ascending: false });
    
        if (limit) query.limit(limit);
    
        const { data, error } = await query;
        if (error) throw createError({ statusCode: 500, message: error.message });
        return data as Article[];
      }
    
    async getAsync(article_id: number): Promise<Article | null> {
        const { data, error } = await useSupabase()
          .from('articles')
          .select('*')
          .eq('id', article_id)
          .single();
    
        if (error) throw createError({ statusCode: 404, message: 'article introuvable' });
        return data as Article;
      }

    async createAsync(dto: CreateArticleDto): Promise<Article> {

      const category_id = await categorieService.resolvedCategoryId(dto.category);
      const { category: _, ...articleData } = dto;

      console.log('categoryId:', category_id)
      console.log('articleData:', articleData)
      console.log('insert payload:', { ...articleData, category_id: category_id })

      const { data, error } = await useSupabase()
        .from('articles')
        .insert({ ...articleData, category_id: category_id})
        .select()
        .single()

      if(error) throw createError({ statusCode: 500, message: error.message });
      return data as Article;
    }
}

export const articleService = new ArticleService();