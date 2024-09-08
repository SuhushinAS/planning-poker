import {useAppDispatch, useAppSelector} from 'app/hooks';
import {actionLocaleGetList, actionLocaleGetMessages} from 'modules/locale/actions';
import {useLocaleCurrent} from 'modules/locale/hooks';
import {localeActions} from 'modules/locale/reducers';
import {selectCurrentMessages, selectLocaleCurrent} from 'modules/locale/selectors';
import {selectLoadItem} from 'modules/status/selectors';
import React, {ReactNode, useEffect} from 'react';
import {IntlProvider} from 'react-intl';

type TLocaleProps = {
  children: ReactNode;
};

export const LocaleProvider = (props: TLocaleProps) => {
  const {children} = props;
  const dispatch = useAppDispatch();
  const localeCurrent = useAppSelector(selectLocaleCurrent);
  const loadMessages = useAppSelector(selectLoadItem(localeActions.getMessages.type));
  const messages = useAppSelector(selectCurrentMessages);

  useLocaleCurrent();

  useEffect(() => {
    dispatch(actionLocaleGetList);
  }, [dispatch]);

  useEffect(() => {
    if (!messages && !loadMessages && localeCurrent) {
      dispatch(actionLocaleGetMessages(localeCurrent));
    }
  }, [dispatch, loadMessages, localeCurrent, messages]);

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider locale={localeCurrent} messages={messages}>
      {children}
    </IntlProvider>
  );
};
