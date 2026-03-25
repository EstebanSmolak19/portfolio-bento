import { Categorie } from "~/types/Categorie";
import { IGenericRepository } from "./IGenericRepository";
import { CreateCategoryDto } from "~/types/DTO/CreateCategoryDto";

export interface ICategoriesRepository extends IGenericRepository<Categorie, CreateCategoryDto>
{
    //Trouve l'id d'une categorie ou la créer si elle n'existe pas.
    resolvedCategoryId(name: string): Promise<number>;
}