import {dispatchData} from 'modules/common/helpers/action';
import {api} from 'modules/common/helpers/api';
import {TAction} from 'modules/common/types';
import {exampleActions} from 'modules/example/reducers';
import {TExample} from 'modules/example/types';
import {loadStop} from 'modules/status/actions';
import {statusActions} from 'modules/status/reducers';

export const actionExampleGetList: TAction<TExample[]> = (dispatch) => {
  dispatch(statusActions.loadStart(exampleActions.getList.type));

  return api
    .requestLocal<TExample[]>('/api/v1/example.json')
    .then(dispatchData(dispatch, exampleActions.getList))
    .then(loadStop(dispatch, exampleActions.getList.type));
};
