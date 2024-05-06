import {createSelector} from '@reduxjs/toolkit';
import {TState} from 'app/types';
import {theme} from 'modules/theme/reducers';
import {TTheme, TThemeAuto, TThemeDevice, TThemeStore} from 'modules/theme/types';

export const selectThemeState = (state: TState): TThemeStore => state[theme.name];

export const selectThemeCurrent = (state: TState): TTheme => selectThemeState(state).current;

export const selectThemeDevice = (state: TState): TThemeDevice => selectThemeState(state).device;

export const selectTheme = createSelector([selectThemeCurrent, selectThemeDevice], (themeCurrent, themeDevice) => {
  if (themeCurrent === TThemeAuto.auto) {
    return themeDevice;
  }

  return themeCurrent;
});
