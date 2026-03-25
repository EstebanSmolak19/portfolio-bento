export default function useFetchSupa<T>(apiCall: (...args: any[]) => Promise<T>) {
    const data = ref<T|null> (null);
    const loading = ref<boolean>(false);
    const error = ref<string|null>(null);

    const execute = async (...args: any[]) => {
        loading.value = true;
        error.value = null;

        try {
            data.value = await apiCall(...args)
            return data.value;
        } catch(err: any) {
            error.value = err;
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    return { data, loading, error, execute }
}