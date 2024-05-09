import {createSlice} from '@reduxjs/toolkit';
import type {TLocaleStore} from 'modules/locale/types';

const initialState: TLocaleStore = {
  current: '',
  data: {},
  list: [],
};

export const locale = createSlice({
  initialState,
  name: 'locale',
  reducers: {
    getList: (state, {payload}) => {
      state.list = payload.list;
    },
    getMessages: (state, {payload}) => {
      const {data, locale} = payload;

      state.data[locale] = data;
    },
    setCurrent: (state, {payload}) => {
      state.current = payload;
    },
  },
});

export const localeActions = locale.actions;
