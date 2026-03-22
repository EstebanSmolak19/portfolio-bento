import { IArticleRepository } from "../repositories/IArticlesRepository";
import { GenericService } from "./GenericService";
import { Skill } from "~/types/Skill";
import { CreateSkillDto } from "~/types/DTO/CreateSkillDto";
import { ISkillsRepository } from "../repositories/ISkillsRepository";

class SkillService extends GenericService<Skill, CreateSkillDto>
  implements ISkillsRepository {

    constructor() {
      super('skills');
    }

}

export const skillService = new SkillService();