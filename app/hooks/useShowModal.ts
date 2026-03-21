export default function useShowModal(value: boolean = false) {
    const show = ref<boolean>(value);
    const setShow = () => show.value = !show.value
    return { show, setShow }
}