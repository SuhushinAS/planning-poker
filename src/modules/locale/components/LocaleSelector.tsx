import {useAppDispatch, useAppSelector} from 'app/hooks';
import {actionLocaleGetMessages, actionLocaleSetCurrent} from 'modules/locale/actions';
import 'modules/locale/components/LocaleSelector.less';
import {selectLocaleCurrent, selectLocaleData, selectLocaleList} from 'modules/locale/selectors';
import React, {useCallback, useEffect, useState} from 'react';

const renderLocaleOption = (locale: string) => (
  <option key={locale} value={locale}>
    {locale}
  </option>
);

export const LocaleSelector = () => {
  const dispatch = useAppDispatch();
  const localeCurrent = useAppSelector(selectLocaleCurrent);
  const localeList = useAppSelector(selectLocaleList);
  const localeData = useAppSelector(selectLocaleData);
  const [locale, setLocale] = useState(localeCurrent);

  const onLocaleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value);
  }, []);

  useEffect(() => {
    if (!localeData[locale]) {
      dispatch(actionLocaleGetMessages(locale));
    } else if (locale !== localeCurrent) {
      dispatch(actionLocaleSetCurrent(locale));
    }
  }, [dispatch, locale, localeCurrent, localeData]);

  return (
    <select className="LocaleSelector" name="locale" onBlur={onLocaleChange} onChange={onLocaleChange} value={locale}>
      {localeList.map(renderLocaleOption)}
    </select>
  );
};
