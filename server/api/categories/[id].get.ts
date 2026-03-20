import { categorieService } from "~~/server/services/CategorieService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    return categorieService.getAsync(id);
})