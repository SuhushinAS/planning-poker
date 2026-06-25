import { TDispatch } from 'src/app/lib/types';
import { api } from 'src/modules/common/lib/api';
import { currentLocaleKey } from 'src/modules/locale/lib/constants';
import { localeActions } from 'src/modules/locale/lib/reducers';
import { TMessages } from 'src/modules/locale/lib/types';
import { getActionSetStatus } from 'src/modules/status/lib/actions';
import { Status } from 'src/modules/status/lib/types';

export const actionLocaleGetList = () => (dispatch: TDispatch) => {
  const localeGetListSetStatus = getActionSetStatus(localeActions.getList.type);

  dispatch(localeGetListSetStatus(Status.loading));

  return api
    .requestLocal<string[]>('/api/v1/locale.json')
    .then((data) => {
      dispatch(localeActions.getList(data));
      dispatch(localeGetListSetStatus(Status.success));
    })
    .catch(() => {
      dispatch(localeGetListSetStatus(Status.error));
    });
};

export const actionLocaleSetCurrent = (locale: string) => (dispatch: TDispatch) => {
  localStorage.setItem(currentLocaleKey, locale);

  return dispatch(localeActions.setCurrent(locale));
};

export const actionLocaleGetMessages = (locale: string) => (dispatch: TDispatch) => {
  const setGetMessagesStatus = getActionSetStatus(localeActions.getMessages.type);

  dispatch(setGetMessagesStatus(Status.loading));

  return api
    .requestLocal<TMessages>(`/api/v1/locale-${locale}.json`)
    .then((data) => {
      dispatch(localeActions.getMessages({ data, language: locale }));
      dispatch(setGetMessagesStatus(Status.success));
    })
    .catch(() => {
      dispatch(setGetMessagesStatus(Status.error));
    });
};
