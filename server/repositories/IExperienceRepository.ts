import type { Experience } from "~/types/Experience";
import type { CreateExperienceDto } from "~/types/DTO/CreateExperienceDto";
import { IGenericRepository } from "./IGenericRepository";

export interface IExperienceRepository extends IGenericRepository<Experience, CreateExperienceDto>
{
}