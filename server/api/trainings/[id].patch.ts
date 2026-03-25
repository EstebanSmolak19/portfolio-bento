import { trainingService } from "~~/server/services/TrainingService";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));
    const body = await readBody(event);
    return trainingService.updateAsync(id, body);
})