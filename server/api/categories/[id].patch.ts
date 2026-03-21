import { categorieService } from "~~/server/services/CategorieService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const body = await readBody(event);
    return categorieService.updateAsync(id, body);
})