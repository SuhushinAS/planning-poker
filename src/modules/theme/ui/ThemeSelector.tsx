import { ReactNode, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/lib/hooks';
import { ListSelector } from 'src/modules/common/ui/ListSelector';
import { SvgIcon } from 'src/modules/common/ui/SvgIcon';
import { actionThemeSetCurrent } from 'src/modules/theme/lib/actions';
import { getTheme } from 'src/modules/theme/lib/getTheme';
import { selectThemeCurrent, selectThemeDevice } from 'src/modules/theme/lib/selectors';
import { ThemeAuto, ThemeDevice, TTheme } from 'src/modules/theme/lib/types';
import { useThemeInit } from 'src/modules/theme/ui/useThemeInit';

const themeList = [ThemeAuto.auto, ThemeDevice.dark, ThemeDevice.light];

const themeIconMap = {
  [ThemeAuto.auto]: 'adjust',
  [ThemeDevice.dark]: 'moon-o',
  [ThemeDevice.light]: 'sun-o',
};

const renderTheme = (theme: TTheme): ReactNode => <SvgIcon name={themeIconMap[theme]} />;

export const ThemeSelector = () => {
  const dispatch = useAppDispatch();
  const themeCurrent = useAppSelector(selectThemeCurrent);
  const themeDevice = useAppSelector(selectThemeDevice);
  const theme = getTheme(themeCurrent, themeDevice);

  const onThemeChange = useCallback(
    (themeNext: TTheme) => {
      dispatch(actionThemeSetCurrent(themeNext));
    },
    [dispatch],
  );

  useThemeInit(theme);

  return (
    <ListSelector
      itemCurrent={themeCurrent}
      itemList={themeList}
      onChange={onThemeChange}
      renderItem={renderTheme}
    />
  );
};
