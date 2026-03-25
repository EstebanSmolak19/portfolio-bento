import type { GenericService } from "~/types/GenericService";
import useFetchSupa from "./useFetch";
import type { WithId } from "~/types/WithId";
import useShowModal from "./useShowModal";

export default function useMethodTable<T extends WithId, TUpdate = Partial<T>>(
    service: GenericService<T, TUpdate>, execute: () => void) {

    const { show, setShow } = useShowModal()
    const selectedType = ref<Record<string, any> | null>(null);

    const handleDelete = async (row: Record<string, any>) => {
        const type = row as T;
        await service.deleteAsync(type.id)
        await execute()
    }

    // Affichage du modal
    const handleEditClick = (row: Record<string, any>) => {
        selectedType.value = { ...row };
        setShow();
    };

    // Submit du modal
    const handleEditSumbit = async (row: Record<string, any>) => {
        const id = selectedType.value?.id;
        await service.updateAsync(id, row as TUpdate);
        await execute()
        setShow(); // Change la valeur de show via le useShowModal
    }

    // Mettre en avant ou non l'entity
    const handleToggle = async (row: Record<string, any>, key: string) => {
        const currentValue = row[key];
        await service.updateAsync(row.id, { [key]: !currentValue } as TUpdate);
        await execute();
    }

    return {
        show,
        selectedType,
        handleDelete,
        handleEditClick,
        handleEditSumbit,
        handleToggle,
    }

}