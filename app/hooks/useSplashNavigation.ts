export default function useSplashNavigation() {
    const route = useRoute();
    const splashDone = ref<boolean>(false);
    const isHome = computed(() => route.path === '/');

    const initSplash = () => {
        if(route.path !== '/') {
            splashDone.value = false;
        }
    }

    return {
        isHome,
        splashDone,
        initSplash
    }
}