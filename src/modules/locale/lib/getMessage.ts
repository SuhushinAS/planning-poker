import { PrimitiveType } from 'intl-messageformat';
import { IntlShape } from 'react-intl';
import { defaultMessage } from 'src/modules/locale/lib/constants';

type Values = Record<string, PrimitiveType>;

export const getMessage = (intl: IntlShape) => {
  return (id?: string, values?: Values): string => {
    return intl.formatMessage({ defaultMessage, id }, values);
  };
};
