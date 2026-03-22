import { trainingService } from "~~/server/services/TrainingService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    return trainingService.deleteAsync(id);
})