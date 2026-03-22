import { trainingService } from "~~/server/services/TrainingService";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return trainingService.createAsync(body);
})