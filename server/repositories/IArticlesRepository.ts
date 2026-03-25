import type { Article } from "~/types/Article";
import type { CreateArticleDto } from "~/types/DTO/CreateArticleDto";
import { IGenericRepository } from "./IGenericRepository";

export interface IArticleRepository extends IGenericRepository<Article, CreateArticleDto>
{
}