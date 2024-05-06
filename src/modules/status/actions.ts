import {TDispatch} from 'app/types';
import {dispatchAction} from 'modules/common/helpers/action';
import {statusActions} from 'modules/status/reducers';

type TLoadStop = <TD>(dispatch: TDispatch, type: string) => (data: TD) => TD;

export const loadStop: TLoadStop = (dispatch, type) => dispatchAction(dispatch, statusActions.loadStop(type));
