import {Action} from '@reduxjs/toolkit';
import {TDispatch} from 'app/types';
import {dispatchData} from 'modules/common/helpers/action';
import {api} from 'modules/common/helpers/api';
import {TAction, TActionData} from 'modules/common/types';
import {localeCurrentKey, localeDefault} from 'modules/locale/constants';
import {localeActions} from 'modules/locale/reducers';
import {TLocale} from 'modules/locale/types';
import {loadStop} from 'modules/status/actions';
import {statusActions} from 'modules/status/reducers';

type TLocaleList = {list: string[]};

export const actionLocaleGetList: TAction<TLocaleList> = (dispatch) => {
  dispatch(statusActions.loadStart(localeActions.getList.type));

  return api
    .requestLocal<TLocaleList>('/api/v1/locale.json')
    .then(dispatchData(dispatch, localeActions.getList))
    .then(loadStop(dispatch, localeActions.getList.type));
};

type TLocaleSetCurrent = (currentLocale: string) => (dispatch: TDispatch) => Action;

export const actionLocaleSetCurrent: TLocaleSetCurrent = (currentLocale) => (dispatch) => {
  localStorage.setItem(localeCurrentKey, currentLocale);

  return dispatch(localeActions.setCurrent(currentLocale));
};

type TLocaleInit = (dispatch: TDispatch) => Action;

export const actionLocaleInit: TLocaleInit = (dispatch) => {
  const currentLocale = localStorage.getItem(localeCurrentKey) || localeDefault;

  return dispatch(actionLocaleSetCurrent(currentLocale));
};

type TMessages = {
  data: TLocale[];
};

export const actionLocaleGetMessages: TActionData<TMessages, string> = (locale) => (dispatch) => {
  dispatch(statusActions.loadStart(localeActions.getMessages.type));

  return api
    .requestLocal<TMessages>(`/api/v1/locale-${locale}.json`)
    .then((data) => {
      dispatchData(dispatch, localeActions.getMessages)({data, locale});

      return data;
    })
    .then(loadStop(dispatch, localeActions.getMessages.type));
};
