import type { Article } from "~/types/Article";
import type { CreateArticleDto } from "~/types/DTO/CreateArticleDto";
import { GenericService } from "./GenericService";

class ArticleService extends GenericService<Article, CreateArticleDto> {
    constructor() {
        super('/articles');
    }
}

export const articleService = new ArticleService();