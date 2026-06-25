import { ThemeAuto, TTheme, TThemeDevice } from 'src/modules/theme/lib/types';

export const getTheme = (themeCurrent: TTheme, themeDevice: TThemeDevice) => {
  if (themeCurrent === ThemeAuto.auto) {
    return themeDevice;
  }

  return themeCurrent;
};
