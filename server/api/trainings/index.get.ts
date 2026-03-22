import { trainingService } from "~~/server/services/TrainingService";

export default defineEventHandler(async (event) => {
    const { limit } = getQuery(event);
    return trainingService.getAllAsync(limit ? Number(limit): undefined)
})