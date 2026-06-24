import { createSlice } from '@reduxjs/toolkit';
import { getThemeCurrent } from 'src/modules/theme/lib/getThemeCurrent';
import { getThemeDevice } from 'src/modules/theme/lib/getThemeDevice';
import { TThemeStore } from 'src/modules/theme/lib/types';

const initialState: TThemeStore = {
  current: getThemeCurrent(),
  device: getThemeDevice(),
};

export const theme = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    setCurrent: (state, { payload }) => {
      state.current = payload;
    },
    setDevice: (state, { payload }) => {
      state.device = payload;
    },
  },
});

export const themeActions = theme.actions;
export const themeName = theme.name;
export const themeReducer = theme.reducer;
