import { MouseEventHandler, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/lib/hooks';
import { actionThemeSetCurrent } from 'src/modules/theme/lib/actions';
import { themeDark } from 'src/modules/theme/lib/constants';
import { getThemeCurrent } from 'src/modules/theme/lib/getThemeCurrent';
import { getThemeDevice } from 'src/modules/theme/lib/getThemeDevice';
import { themeActions } from 'src/modules/theme/lib/reducers';
import { selectTheme, selectThemeCurrent } from 'src/modules/theme/lib/selectors';
import { ThemeAuto, ThemeDevice, TThemeDevice } from 'src/modules/theme/lib/types';
import { ThemeSelectorIcon } from 'src/modules/theme/ui/ThemeSelectorIcon';
import 'src/modules/theme/ui/ThemeSelector.less';

const themeList = [ThemeAuto.auto, ThemeDevice.dark, ThemeDevice.light];

const themeNumMap = Object.fromEntries(themeList.map((value, index) => [value, index]));

const themeMap: Record<TThemeDevice, string> = {
  [ThemeDevice.dark]: 'theme_dark',
  [ThemeDevice.light]: 'theme_light',
};

const { body } = document;

export const ThemeSelector = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const themeCurrent = useAppSelector(selectThemeCurrent);

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const themeCurrentNum = themeNumMap[themeCurrent];
    const themeNextNum = (themeCurrentNum + 1) % themeList.length;
    const themeNext = themeList[themeNextNum];

    dispatch(actionThemeSetCurrent(themeNext));
  }, [dispatch, themeCurrent]);

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

  return (
    <button className="ThemeSelector" onClick={onClick} type="button">
      <div className="ThemeSelector__IconWrapper">
        {themeList.map((theme) => {
          return <ThemeSelectorIcon isCurrent={theme === themeCurrent} key={theme} theme={theme} />;
        })}
      </div>
    </button>
  );
};
