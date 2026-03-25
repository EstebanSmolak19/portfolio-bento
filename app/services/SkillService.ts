import { GenericService } from "./GenericService";
import type { Skill } from "~/types/Skill";
import type { CreateSkillDto } from "~/types/DTO/CreateSkillDto";

class SkillService extends GenericService<Skill, CreateSkillDto> {
    constructor() {
        super('/skills');
    }
}

export const skillService = new SkillService();