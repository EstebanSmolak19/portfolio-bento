import type { Skill } from "~/types/Skill";
import type { CreateSkillDto } from "~/types/DTO/CreateSkillDto";
import { IGenericRepository } from "./IGenericRepository";

export interface ISkillsRepository extends IGenericRepository<Skill, CreateSkillDto>
{
}