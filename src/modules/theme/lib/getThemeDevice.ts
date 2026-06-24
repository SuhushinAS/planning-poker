import { themeDark } from 'src/modules/theme/lib/constants';
import { ThemeDevice, TThemeDevice } from 'src/modules/theme/lib/types';

export const getThemeDevice = (): TThemeDevice => {
  return themeDark.matches ? ThemeDevice.dark : ThemeDevice.light;
};
