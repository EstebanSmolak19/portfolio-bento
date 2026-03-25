import { GenericService } from "./GenericService";
import { Experience } from "~/types/Experience";
import { CreateExperienceDto } from "~/types/DTO/CreateExperienceDto";
import { IExperienceRepository } from "../repositories/IExperienceRepository";

class ExperienceService extends GenericService<Experience, CreateExperienceDto>
  implements IExperienceRepository {

    constructor() {
      super('experiences');
    }

    async createAsync(dto: CreateExperienceDto): Promise<Experience> {
      const payload = {
        ...dto,
          missions: this.splitList(dto.missions),
          stack: this.splitList(dto.stack),
          skills: this.splitList(dto.skills)
      }
      const { data, error } = await useSupabase()
        .from(this.tableName)
        .insert(payload)
        .select()
        .single()

      if (error) throw createError({ statusCode: 500, message: error.message });
      return data as Experience;
    }

    /**
     * Méthode interne qui permet de séparé une chaine de caractère en fonction des virgules.
     * @param val une 'liste' de type choix1, choix2, choix3, ... 
     */
    private splitList(val: string): string[] {
      return val?.split(',').map(s => s.trim()).filter(Boolean) ?? []
    }

}

export const experienceService = new ExperienceService();