const themes = {
    DARK: "dark",
    LIGHT: "light"
};

const root = document.documentElement

export const toggleTheme = () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === themes.DARK ? themes.LIGHT : themes.DARK;
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

export const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.DARK : themes.LIGHT;
    const theme = savedTheme || systemTheme;
    root.setAttribute('data-theme', theme);
}