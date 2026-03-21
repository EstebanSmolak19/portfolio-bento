export interface IGenericRepository<T, CreateDto, UpdateDto = Partial<CreateDto>> {
    // Récupérer tout (avec option de limite)
    getAllAsync(limit?: number): Promise<T[]>;

    // Récupérer par ID
    getAsync(id: number | string): Promise<T | null>;

    // Créer
    createAsync(dto: CreateDto): Promise<T>;

    // Mettre à jour (souvent partiel)
    updateAsync(id: number | string, dto: UpdateDto): Promise<T>;

    // Supprimer
    deleteAsync(id: number | string): Promise<boolean>;
}