import { ReactNode, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useAppDispatch, useAppSelector } from 'src/app/lib/hooks';
import { actionLocaleGetList, actionLocaleGetMessages } from 'src/modules/locale/lib/actions';
import { localeActions } from 'src/modules/locale/lib/reducers';
import { selectCurrentMessages, selectLocaleCurrent } from 'src/modules/locale/lib/selectors';
import { selectStatusItem } from 'src/modules/status/lib/selectors';
import { Status } from 'src/modules/status/lib/types';

type TProps = {
  children: ReactNode;
};

export const LocaleProvider = ({ children }: TProps) => {
  const dispatch = useAppDispatch();
  const localeCurrent = useAppSelector(selectLocaleCurrent);
  const messages = useAppSelector(selectCurrentMessages);
  const messagesStatus = useAppSelector(selectStatusItem(localeActions.getMessages.type));
  const [messagesActive, setMessagesActive] = useState(messages);

  useEffect(() => {
    dispatch(actionLocaleGetList());
  }, [dispatch]);

  useEffect(() => {
    if (messages) {
      setMessagesActive(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (messagesStatus !== Status.loading && localeCurrent && !messages) {
      dispatch(actionLocaleGetMessages(localeCurrent));
    }
  }, [dispatch, localeCurrent, messages, messagesStatus]);

  if (messagesStatus !== Status.success && !messagesActive) {
    return null;
  }

  return (
    <IntlProvider locale={localeCurrent} messages={messagesActive}>
      {children}
    </IntlProvider>
  );
};
