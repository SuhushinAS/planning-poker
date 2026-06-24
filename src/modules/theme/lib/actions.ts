import { Action } from '@reduxjs/toolkit';
import { TDispatch } from 'src/app/lib/types';
import { themeCurrentKey } from 'src/modules/theme/lib/constants';
import { themeActions } from 'src/modules/theme/lib/reducers';
import { TTheme } from 'src/modules/theme/lib/types';

type TThemeCurrentSet = (themeCurrent: TTheme) => (dispatch: TDispatch) => Action;

export const actionThemeSetCurrent: TThemeCurrentSet = (themeCurrent) => (dispatch) => {
  localStorage.setItem(themeCurrentKey, themeCurrent);

  return dispatch(themeActions.setCurrent(themeCurrent));
};
