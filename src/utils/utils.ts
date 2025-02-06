import { parse } from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const getPagePath = () => window.location.href.split('?')[0];

export const getRequestQuery = (url: string) => parse(url.split('?')[1]);

export const getRequestPath = (url: string) => parse(url.split('?')[0]);

export const getTheme = () => {
    // @ts-ignore
    const localValue = localStorage.getItem('code_theme') || '{}';
    let { theme = 'light', isFollowSystem = false } = JSON.parse(localValue);
    if (isFollowSystem) {
        const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
        theme = themeMedia.matches ? 'light' : 'dark';
        localStorage.setItem('code_theme', JSON.stringify({ theme, isFollowSystem }));
    }
    // console.log('theme', theme);
    return theme;
}

export const setTheme = (theme: string, isFollowSystem = false) => {
    localStorage.setItem('code_theme', JSON.stringify({ theme, isFollowSystem }));
    document.body.setAttribute('data-theme', theme);
}