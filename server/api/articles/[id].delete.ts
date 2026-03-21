import { articleService } from "~~/server/services/ArticleService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    return articleService.deleteAsync(id);
})