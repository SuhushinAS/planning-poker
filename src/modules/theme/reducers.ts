import {createSlice} from '@reduxjs/toolkit';
import {themeDark} from 'modules/theme/constants';
import {getThemeCurrent, getThemeDevice} from 'modules/theme/helpers';
import {TThemeStore} from 'modules/theme/types';

const initialState: TThemeStore = {
  current: getThemeCurrent(),
  device: getThemeDevice(themeDark),
};

export const theme = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    setCurrent: (state, {payload}) => {
      state.current = payload;
    },
    setDevice: (state, {payload}) => {
      state.device = payload;
    },
  },
});

export const themeActions = theme.actions;
