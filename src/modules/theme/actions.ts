import {Action} from '@reduxjs/toolkit';
import {TDispatch} from 'app/types';
import {themeCurrentKey} from 'modules/theme/constants';
import {themeActions} from 'modules/theme/reducers';
import {TTheme} from 'modules/theme/types';

type TThemeCurrentSet = (themeCurrent: TTheme) => (dispatch: TDispatch) => Action;

export const actionThemeCurrentSet: TThemeCurrentSet = (themeCurrent) => (dispatch) => {
  localStorage.setItem(themeCurrentKey, themeCurrent);

  return dispatch(themeActions.setCurrent(themeCurrent));
};
