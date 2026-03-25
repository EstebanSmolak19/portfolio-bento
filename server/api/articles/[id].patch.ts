import { articleService } from "~~/server/services/ArticleService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const body = await readBody(event);
    return articleService.updateAsync(id, body);
})