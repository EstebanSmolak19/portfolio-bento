import { Article } from "~/types/Article";
import { IArticleRepository } from "../repositories/IArticlesRepository";
import { CreateArticleDto } from "~/types/DTO/CreateArticleDto";
import { categorieService } from "./CategorieService";
import { GenericService } from "./GenericService";

class ArticleService extends GenericService<Article, CreateArticleDto>
  implements IArticleRepository {

    constructor() {
      super('articles');
    }

    async createAsync(dto: CreateArticleDto): Promise<Article> {

      const category_id = await categorieService.resolvedCategoryId(dto.category);
      const { category: _, ...articleData } = dto;

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