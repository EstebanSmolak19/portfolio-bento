import { categorieService } from "~~/server/services/CategorieService";

export default defineEventHandler(async (event) => {
    const { limit } = getQuery(event);
    return categorieService.getAllAsync(limit ? Number(limit): undefined)
})