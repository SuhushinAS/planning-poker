import {localeCurrentKey, localeDefault} from 'modules/locale/constants';
import {TMessage} from 'modules/locale/types';
import {IntlShape} from 'react-intl';

type TGetOptions = (id: string) => {
  defaultMessage: string;
  id: string;
};

export const getOptions: TGetOptions = (id: string) => ({defaultMessage: '\u00A0', id});

export type TGetMessage = (intl: IntlShape) => TMessage;

export const getMessage: TGetMessage =
  <V>(intl) =>
  (id, values: V) =>
    intl.formatMessage(getOptions(id), values);

export const getLocaleCurrent = (localeList: string[]): string => {
  try {
    const localeCurrent = localStorage.getItem(localeCurrentKey);

    if (null === localeCurrent) {
      return localeDefault;
    }

    if (localeList.includes(localeCurrent)) {
      return localeCurrent;
    }

    return localeDefault;
  } catch {
    return localeDefault;
  }
};
