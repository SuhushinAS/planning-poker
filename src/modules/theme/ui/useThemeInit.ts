import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/lib/hooks';
import { actionThemeSetCurrent } from 'src/modules/theme/lib/actions';
import { themeDark } from 'src/modules/theme/lib/constants';
import { getThemeCurrent } from 'src/modules/theme/lib/getThemeCurrent';
import { getThemeDevice } from 'src/modules/theme/lib/getThemeDevice';
import { themeActions } from 'src/modules/theme/lib/reducers';
import { ThemeDevice, TThemeDevice } from 'src/modules/theme/lib/types';

const themeMap: Record<TThemeDevice, string> = {
  [ThemeDevice.dark]: 'theme_dark',
  [ThemeDevice.light]: 'theme_light',
};

const { body } = document;

export const useThemeInit = (theme: TThemeDevice) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onDeviceThemeChange = () => {
      dispatch(themeActions.setDevice(getThemeDevice()));
    };

    dispatch(actionThemeSetCurrent(getThemeCurrent()));
    onDeviceThemeChange();

    themeDark.addEventListener('change', onDeviceThemeChange);

    return () => {
      themeDark.removeEventListener('change', onDeviceThemeChange);
    };
  }, [dispatch]);

  useEffect(() => {
    body.classList.add('theme');
  }, []);

  useEffect(() => {
    body.classList.add(themeMap[theme]);

    return () => {
      body.classList.remove(themeMap[theme]);
    };
  }, [theme]);
};
