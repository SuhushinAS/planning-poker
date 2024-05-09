export enum TThemeDevice {
  'dark' = 'dark',
  'light' = 'light',
}

export enum TThemeAuto {
  'auto' = 'auto',
}

export type TTheme = TThemeDevice | TThemeAuto;

export type TThemeStore = {
  current: TTheme;
  device: TThemeDevice;
};
