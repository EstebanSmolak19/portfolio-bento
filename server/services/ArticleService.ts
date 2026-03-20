import { Article } from "~/types/Article";
import { IArticleRepository } from "../repositories/IArticlesRepository";
import { CreateArticleDto } from "~/types/DTO/CreateArticleDto";

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
      const { data, error } = await useSupabase()
        .from('articles')
        .insert(dto)
        .select()
        .single()

      if(error) throw createError({ statusCode: 500, message: error.message });
      return data as Article;
    }
}

export const articleService = new ArticleService();