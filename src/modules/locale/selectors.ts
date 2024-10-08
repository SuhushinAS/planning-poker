import {TState} from 'app/types';
import {locale} from 'modules/locale/reducers';
import {TLocale, TLocaleData, TLocaleStore} from 'modules/locale/types';

export const selectLocale = (state: TState): TLocaleStore => state[locale.name];

export const selectLocaleData = (state: TState): TLocaleData => selectLocale(state).data;

export const selectLocaleList = (state: TState): string[] => selectLocale(state).list;

export const selectLocaleCurrent = (state: TState): string => selectLocale(state).current;

export const selectCurrentMessages = (state: TState): TLocale => {
  const localeCurrent = selectLocaleCurrent(state);

  return selectLocaleData(state)[localeCurrent];
};
