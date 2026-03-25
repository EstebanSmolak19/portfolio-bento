import { GenericService } from "./GenericService";
import type { Training } from "~/types/Training";
import type { CreateTrainingDto } from "~/types/DTO/CreateTrainingDto";

class TrainingService extends GenericService<Training, CreateTrainingDto> {
    constructor() {
        super('/trainings');
    }
}

export const trainingService = new TrainingService();