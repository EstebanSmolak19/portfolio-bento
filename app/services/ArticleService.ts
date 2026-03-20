import type { Article } from "~/types/Article";

class ArticleService {

    async getAllAsync(limit?: number): Promise<Article[]> {
        return $fetch('/api/articles', {query: { limit }})
    }

    async getAsync(id: number): Promise<Article|null> {
        return $fetch(`/api/articles/${id}`)
    }
}

export const articleService = new ArticleService();