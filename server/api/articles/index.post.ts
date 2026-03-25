import { articleService } from "~~/server/services/ArticleService";
import { ArticleSchema } from "../../../app/schema/ArticleSchema";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // On verif si les champs via le schema Zod
    const result = ArticleSchema.safeParse(body);
    if(!result.success) {
        throw createError({ statusCode: 422, message: "Donnée invalides"});
    }

    return articleService.createAsync(result.data);
})