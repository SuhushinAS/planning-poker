import {TState} from 'app/types';
import {getList} from 'modules/common/helpers/selectors';
import {game} from 'modules/game/reducers';
import {TGame, TGameMap, TGameStore} from 'modules/game/types';
import {createSelector} from 'reselect';

export const selectGame = (state: TState): TGameStore => state[game.name];

export const selectGameData = (state: TState): TGameMap => selectGame(state).data;

export const selectGameIdList = (state: TState): string[] => selectGame(state).list;

export const selectGameList = createSelector([selectGameData, selectGameIdList], getList);

export const selectGameItem =
  (id: string) =>
  (state: TState): TGame =>
    selectGameData(state)[id];
