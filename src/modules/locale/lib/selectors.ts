import { TState } from 'src/app/lib/types';
import { localeName } from 'src/modules/locale/lib/reducers';

export const selectLocale = (state: TState) => {
  return state[localeName];
};

export const selectLocaleData = (state: TState) => selectLocale(state).data;

export const selectLocaleList = (state: TState) => selectLocale(state).list;

export const selectLocaleCurrent = (state: TState) => selectLocale(state).current;

export const selectCurrentMessages = (state: TState) => {
  const localeCurrent = selectLocaleCurrent(state);

  return selectLocaleData(state)[localeCurrent];
};
