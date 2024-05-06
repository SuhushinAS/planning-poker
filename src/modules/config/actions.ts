import type {TDispatch} from 'app/types';
import {dispatchData} from 'modules/common/helpers/action';
import {api} from 'modules/common/helpers/api';
import {configActions} from 'modules/config/reducers';
import {TConfig} from 'modules/config/types';
import {loadStop} from 'modules/status/actions';
import {statusActions} from 'modules/status/reducers';

export const actionConfigGet = () => (dispatch: TDispatch) => {
  dispatch(statusActions.loadStart(configActions.update.type));

  return api
    .requestLocal<TConfig>('/api/v1/config.json')
    .then(dispatchData(dispatch, configActions.update))
    .then(loadStop(dispatch, configActions.update.type));
};
