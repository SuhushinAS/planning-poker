import { createSelector } from '@reduxjs/toolkit';
import { TState } from 'src/app/lib/types';
import { theme } from 'src/modules/theme/lib/reducers';
import { ThemeAuto, TTheme, TThemeDevice, TThemeStore } from 'src/modules/theme/lib/types';

export const selectThemeState = (state: TState): TThemeStore => state[theme.name];

export const selectThemeCurrent = (state: TState): TTheme => selectThemeState(state).current;

export const selectThemeDevice = (state: TState): TThemeDevice => selectThemeState(state).device;

export const selectTheme = createSelector(
  [selectThemeCurrent, selectThemeDevice],
  (themeCurrent, themeDevice) => {
    if (themeCurrent === ThemeAuto.auto) {
      return themeDevice;
    }

    return themeCurrent;
  },
);
