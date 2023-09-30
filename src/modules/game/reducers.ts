import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit/dist/createAction';
import {getId, getNormalize} from 'modules/common/helpers/normalize';
import {gameIdKey} from 'modules/game/constants';
import {TGame, TGameStore} from 'modules/game/types';

const getGameId = getId(gameIdKey);

const normalizeGame = getNormalize<TGame>(getGameId);

const initialState: TGameStore = {
  data: {},
  list: [],
};

export const game = createSlice({
  initialState,
  name: 'game',
  reducers: {
    getList: (state, {payload}: PayloadAction<{data: TGame[]}>) => ({...state, ...normalizeGame(payload.data)}),
  },
});
