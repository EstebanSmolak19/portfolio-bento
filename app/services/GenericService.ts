export class GenericService<T, CreateDto extends object, UpdateDto extends object = Partial<CreateDto>> {
    constructor(protected readonly endpoint: string) {}

    protected get BaseUrl(): string {
        const config = useRuntimeConfig();
        return`${config.public.apiBase}${this.endpoint}`;
    }

    async getAllAsync(limit?: number): Promise<T[]> {
        const data = await $fetch(this.BaseUrl, {
            query: { limit }
        });
        return data as T[];
    }

    async getAsync(id: number | string): Promise<T> {
        const data = await $fetch(`${this.BaseUrl}/${id}`);
        return data as T;
    }

    async createAsync(dto: CreateDto): Promise<T> {
        const data = await $fetch(this.BaseUrl, {
            method: 'POST',
            body: dto
        });
        return data as T;
    }

    async updateAsync(id: number | string, dto: UpdateDto): Promise<T> {
        const data = await $fetch(`${this.BaseUrl}/${id}`, {
            method: 'PATCH',
            body: dto
        });
        return data as T;
    }

    async deleteAsync(id: number | string): Promise<void> {
        await $fetch(`${this.BaseUrl}/${id}`, {
            method: 'DELETE'
        });
    }
}