import {dispatchData} from 'modules/common/helpers/action';
import {api} from 'modules/common/helpers/api';
import {TAction} from 'modules/common/types';
import {game} from 'modules/game/reducers';
import {TGame} from 'modules/game/types';
import {loadStop} from 'modules/status/actions';
import {status} from 'modules/status/reducers';

export const actionGameGetList: TAction<TGame[]> = (dispatch) => {
  dispatch(status.actions.loadStart(game.actions.getList.type));

  return api
    .requestLocal<TGame[]>('/api/v1/game.json')
    .then(dispatchData(dispatch, game.actions.getList))
    .then(loadStop(dispatch, game.actions.getList.type));
};
