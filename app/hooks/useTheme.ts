export const useTheme = () => {
    const theme = useCookie<'dark' | 'light'>('theme', { default: () => 'dark'});

    const toggleTheme = () => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark';
        applyTheme(theme.value);
    }

    const applyTheme = (theme: 'dark' | 'light') => {
        document.documentElement.setAttribute('data-theme', theme);
    }

    onMounted(() => applyTheme(theme.value));

    return { theme, toggleTheme }
}