import type { Project } from "~/types/Project";
import type { CreateProjectDto } from "~/types/DTO/CreateProjectDto";
import { IGenericRepository } from "./IGenericRepository";

export interface IProjectRepository extends IGenericRepository<Project, CreateProjectDto>
{
}