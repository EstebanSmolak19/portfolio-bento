import type { Training } from "~/types/Training";
import type { CreateTrainingDto } from "~/types/DTO/CreateTrainingDto";
import { IGenericRepository } from "./IGenericRepository";

export interface ITrainingRepository extends IGenericRepository<Training, CreateTrainingDto>
{
}