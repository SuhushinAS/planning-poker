import { getIsObjectValue } from 'src/modules/common/lib/getIsObjectValue';
import { GetUnion } from 'src/modules/common/lib/GetUnion';

export const ThemeDevice = {
  dark: 'dark',
  light: 'light',
} as const;

export type TThemeDevice = GetUnion<typeof ThemeDevice>;

export const isThemeDevice = getIsObjectValue(ThemeDevice);

export const ThemeAuto = {
  auto: 'auto',
} as const;

export type TThemeAuto = GetUnion<typeof ThemeAuto>;

export type TTheme = TThemeDevice | TThemeAuto;

export type TThemeStore = {
  current: TTheme;
  device: TThemeDevice;
};
