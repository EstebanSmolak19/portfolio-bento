import type { Project } from "~/types/Project";
import type { IProjectRepository } from "../repositories/IProjectRepository";
import { useSupabase } from "../utils/useSupabase";

class ProjectService implements IProjectRepository {

  async getAllAsync(limit?: number): Promise<Project[]> {
    const query = useSupabase()
      .from('projects')
      .select('*')
      .order('id', { ascending: false });

    if (limit) query.limit(limit);

    const { data, error } = await query;
    if (error) throw createError({ statusCode: 500, message: error.message });
    return data as Project[];
  }

  async getAsync(project_id: number): Promise<Project | null> {
    const { data, error } = await useSupabase()
      .from('projects')
      .select('*')
      .eq('id', project_id)
      .single();

    if (error) throw createError({ statusCode: 404, message: 'Projet introuvable' });
    return data as Project;
  }

  async createProject(link: string): Promise<Project> {
    const match = link.match(/github\.com\/([^/]+\/[^/]+)/) // Récup le pseudo et le repos
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
}

export const projectService = new ProjectService();