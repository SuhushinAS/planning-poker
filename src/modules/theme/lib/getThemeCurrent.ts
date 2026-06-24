import { themeCurrentKey, themeDefault } from 'src/modules/theme/lib/constants';
import { isThemeDevice, TTheme } from 'src/modules/theme/lib/types';

export const getThemeCurrent = (): TTheme => {
  try {
    const themeCurrent = localStorage.getItem(themeCurrentKey);

    if (null === themeCurrent) {
      return themeDefault;
    }

    const themeDevice = isThemeDevice(themeCurrent) ? themeCurrent : undefined;

    if (themeDevice === undefined) {
      return themeDefault;
    }

    return themeDevice;
  } catch {
    return themeDefault;
  }
};
