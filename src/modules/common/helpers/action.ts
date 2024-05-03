import {Action, ActionCreator} from '@reduxjs/toolkit';
import {TDispatch} from 'app/types';

type TDispatchData = <TD>(dispatch: TDispatch, action: ActionCreator<Action>) => (data: TD) => TD;

export const dispatchData: TDispatchData = (dispatch, action) => (data) => {
  dispatch(action(data));

  return data;
};

type TDispatchAction = <TD>(dispatch: TDispatch, action: Action) => (data: TD) => TD;

export const dispatchAction: TDispatchAction = (dispatch, action) => (data) => {
  dispatch(action);

  return data;
};
