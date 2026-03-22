import type { Project } from "~/types/Project";
import type { IProjectRepository } from "../repositories/IProjectRepository";
import { useSupabase } from "../utils/useSupabase";
import { CreateProjectDto } from "~/types/DTO/CreateProjectDto";
import { GenericService } from "./GenericService";

class ProjectService extends GenericService<Project, CreateProjectDto>
  implements IProjectRepository {

    constructor() {
      super('projects')
    }

  async createAsync(dto: CreateProjectDto): Promise<Project> {
    const match = dto.link.match(/github\.com\/([^/]+\/[^/]+)/) // Récup le pseudo et le repos
    const ghData = await $fetch<any>(`https://api.github.com/repos/${match[1]}`)

    const project = {
      title: ghData.name,
      description: ghData.description ?? '',
      link: ghData.html_url,
      language: ghData.language ?? '',
      is_featured: false,
    }

    const { data, error } = await useSupabase()
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) throw createError({ statusCode: 500, message: error.message });
    return data as Project;
  }

  async getFirstPageProject(): Promise<Project|null> {
    const query = useSupabase()
        .from(this.tableName)
        .select('*')
        .eq('first_page', true)
        .limit(1)
        .maybeSingle()

      const { data, error } = await query;
      if (error) throw createError({ statusCode: 500, message: error.message });

      return data as Project|null;
    }
}

export const projectService = new ProjectService();