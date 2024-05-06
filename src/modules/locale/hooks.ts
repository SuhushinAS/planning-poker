import {useAppDispatch, useAppSelector} from 'app/hooks';
import {actionLocaleSetCurrent} from 'modules/locale/actions';
import {getLocaleCurrent, getMessage} from 'modules/locale/helpers';
import {selectLocaleList} from 'modules/locale/selectors';
import {TMessage} from 'modules/locale/types';
import {useEffect, useMemo} from 'react';
import {useIntl} from 'react-intl';

export const useLocaleCurrent = () => {
  const dispatch = useAppDispatch();
  const localeList = useAppSelector(selectLocaleList);

  useEffect(() => {
    const themeCurrent = getLocaleCurrent(localeList);

    dispatch(actionLocaleSetCurrent(themeCurrent));
  }, [dispatch, localeList]);
};

export const useMessage: TMessage = (id, values) => {
  const intl = useIntl();

  return useMemo(() => getMessage(intl)(id, values), [id, intl, values]);
};
