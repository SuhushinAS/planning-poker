import { ThemeAuto } from 'src/modules/theme/lib/types';

export const themeDefault = ThemeAuto.auto;
export const themeCurrentKey = 'themeCurrent';
export const themeDark = window.matchMedia('(prefers-color-scheme: dark)');
