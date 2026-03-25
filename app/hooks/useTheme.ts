export const useTheme = () => {
    const theme = useCookie<'dark' | 'light'>('theme', { default: () => 'dark'});

    const toggleTheme = () => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark';
        applyTheme(theme.value);
    }

    const applyTheme = (themeValue: 'dark' | 'light') => {
        document.documentElement.setAttribute('data-theme', themeValue);
    }

    onMounted(() => applyTheme(theme.value));

    return { theme, toggleTheme }
}