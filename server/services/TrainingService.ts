import { GenericService } from "./GenericService";
import { Training } from "~/types/Training";
import { CreateTrainingDto } from "~/types/DTO/CreateTrainingDto";
import { ITrainingRepository } from "../repositories/ITrainingRepository";

class TrainingService extends GenericService<Training, CreateTrainingDto>
  implements ITrainingRepository {

    constructor() {
      super('trainings');
    }

    //Override de la méthode (Récup par ordre décroissant)
    async getAllAsync(limit?: number): Promise<Training[]> {
      const query = useSupabase()
        .from(this.tableName)
        .select('*')
        .order('order', { ascending: false }); // Ordre décroissant par 'order'

      if (limit) query.limit(limit);

      const { data, error } = await query;
      if (error) throw createError({ statusCode: 500, message: error.message });
      return data as Training[];
    }
}

export const trainingService = new TrainingService();