import { GenericService } from "./GenericService";
import type { Experience } from "~/types/Experience";
import type { CreateExperienceDto } from "~/types/DTO/CreateExperienceDto";

class ExperienceService extends GenericService<Experience, CreateExperienceDto> {
    constructor() {
        super('/experiences');
    }
}

export const experienceService = new ExperienceService();