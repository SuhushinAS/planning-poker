import {getMessage} from 'modules/locale/helpers';
import {TMessage} from 'modules/locale/types';
import {useMemo} from 'react';
import {useIntl} from 'react-intl';

export const useMessage: TMessage = (id, values) => {
  const intl = useIntl();

  return useMemo(() => getMessage(intl)(id, values), [id, intl, values]);
};
