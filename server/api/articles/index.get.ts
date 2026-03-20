import { articleService } from "~~/server/services/ArticleService";

export default defineEventHandler(async (event) => {
    const { limit } = getQuery(event);
    return articleService.getAllAsync(limit ? Number(limit): undefined)
})