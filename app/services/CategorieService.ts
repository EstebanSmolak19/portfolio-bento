import type { Categorie } from "~/types/Categorie";
import type { CreateCategoryDto } from "~/types/DTO/CreateCategoryDto";
import { GenericService } from "../services/GenericService";

class CategorieService extends GenericService<Categorie, CreateCategoryDto>{
    constructor() {
        super('/categories');
    }
}

export const categorieService = new CategorieService();