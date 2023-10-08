import {useAppDispatch, useAppSelector} from 'app/hooks';
import {actionLocaleSetCurrent} from 'modules/locale/actions';
import 'modules/locale/components/LocaleSelector.less';
import {selectLocaleCurrent, selectLocaleList} from 'modules/locale/selectors';
import React, {useCallback} from 'react';

const renderLocaleOption = (locale: string) => (
  <option key={locale} value={locale}>
    {locale}
  </option>
);

export const LocaleSelectorContainer = () => {
  const dispatch = useAppDispatch();
  const localeCurrent = useAppSelector(selectLocaleCurrent);
  const localeList = useAppSelector(selectLocaleList);

  const onLocaleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(actionLocaleSetCurrent(event.target.value || ''));
    },
    [dispatch]
  );

  return (
    <select className="LocaleSelector" name="locale" onChange={onLocaleChange} value={localeCurrent}>
      {localeList.map(renderLocaleOption)}
    </select>
  );
};
