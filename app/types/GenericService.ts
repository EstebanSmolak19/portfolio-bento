import type { WithId } from "./WithId"

export interface GenericService<T extends WithId, TUpdate = Partial<T>> {
  getAllAsync: () => Promise<T[]>
  deleteAsync: (id: string|number) => Promise<void>
  updateAsync: (id: T['id'], data: TUpdate) => Promise<T | void>
}
