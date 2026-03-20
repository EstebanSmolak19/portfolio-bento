import type { Article } from "~/types/Article";
import type { CreateArticleDto } from "~/types/DTO/CreateArticleDto";

class ArticleService {

    async getAllAsync(limit?: number): Promise<Article[]> {
        return $fetch('/api/articles', {query: { limit }})
    }

    async getAsync(id: number): Promise<Article|null> {
        return $fetch(`/api/articles/${id}`)
    }

    async createAsyn(dto: CreateArticleDto): Promise<Article> {
        return $fetch('/api/articles', {
            method: 'POST',
            body: { dto }
        })
    }
}

export const articleService = new ArticleService();