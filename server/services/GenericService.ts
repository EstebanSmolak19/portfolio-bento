import { IGenericRepository } from "../repositories/IGenericRepository";

export class GenericService<T, CreateDto, UpdateDto = Partial<CreateDto>> implements
    IGenericRepository<T, CreateDto, UpdateDto>
    {
        constructor(protected readonly tableName: string){}

        async getAllAsync(limit?: number): Promise<T[]> {
            const query = useSupabase()
              .from(this.tableName)
              .select('*')
              .order('id', { ascending: false });

            if (limit) query.limit(limit);

            const { data, error } = await query;
            if (error) throw createError({ statusCode: 500, message: error.message });
            return data as T[];
          }

        async getAsync(project_id: number): Promise<T | null> {
            const { data, error } = await useSupabase()
              .from(this.tableName)
              .select('*')
              .eq('id', project_id)
              .single();

            if (error) throw createError({ statusCode: 404, message: 'Projet introuvable' });
            return data as T;
          }

        async createAsync(dto: CreateDto): Promise<T> {
            const { data, error } = await useSupabase()
                .from(this.tableName)
                .insert(dto)
                .select()
                .single();

            if (error) throw createError({ statusCode: 500, message: error.message });
            return data as T;
        }

        async updateAsync(id: number, dto: UpdateDto): Promise<T> {
            const { data, error } = await useSupabase()
                .from(this.tableName)
                .update(dto as any)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw createError({statusCode: 500, message: `Erreur lors de la mise à jour de ${this.tableName}: ${error.message}`});
            }

            return data as T;
        }

        async deleteAsync(id: number): Promise<boolean> {
            const { error } = await useSupabase()
                .from(this.tableName)
                .delete()
                .eq('id', id);

            if (error) {
                throw createError({statusCode: 500, message: `Erreur lors de la suppression dans ${this.tableName}: ${error.message}`});
            }
            return true;
        }
    }