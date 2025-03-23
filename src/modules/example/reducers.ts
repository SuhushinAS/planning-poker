import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getId, getNormalize} from 'modules/common/helpers/normalize';
import {exampleIdKey} from 'modules/example/constants';
import {TExample, TExampleStore} from 'modules/example/types';

const getExampleId = getId(exampleIdKey);

const normalizeExample = getNormalize<TExample>(getExampleId);

const initialState: TExampleStore = {
  data: {},
  list: [],
};

export const example = createSlice({
  initialState,
  name: 'example',
  reducers: {
    getList: (state, {payload}: PayloadAction<{data: TExample[]}>) => ({...state, ...normalizeExample(payload.data)}),
  },
});

export const exampleActions = example.actions;
