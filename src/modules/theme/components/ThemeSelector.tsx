import {useAppDispatch, useAppSelector} from 'app/hooks';
import {actionThemeCurrentSet} from 'modules/theme/actions';
import 'modules/theme/components/ThemeSelector.less';
import {ThemeSelectorIcon} from 'modules/theme/components/ThemeSelectorIcon';
import {useTheme, useThemeCurrent, useThemeDevice} from 'modules/theme/hooks';
import {selectThemeCurrent} from 'modules/theme/selectors';
import {TThemeAuto, TThemeDevice} from 'modules/theme/types';
import React, {MouseEventHandler, useCallback} from 'react';

const themeList = [TThemeAuto.auto, TThemeDevice.dark, TThemeDevice.light];

const themeNumMap = Object.fromEntries(themeList.map((value, index) => [value, index]));

export const ThemeSelector = () => {
  const dispatch = useAppDispatch();
  const themeCurrent = useAppSelector(selectThemeCurrent);

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const themeCurrentNum = themeNumMap[themeCurrent];
    const themeNextNum = (themeCurrentNum + 1) % themeList.length;
    const themeNext = themeList[themeNextNum];

    dispatch(actionThemeCurrentSet(themeNext));
  }, [dispatch, themeCurrent]);

  useThemeCurrent();

  useThemeDevice();

  useTheme();

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
