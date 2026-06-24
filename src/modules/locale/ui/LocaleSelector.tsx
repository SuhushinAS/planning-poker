import { ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/lib/hooks';
import { actionLocaleSetCurrent } from 'src/modules/locale/lib/actions';
import { selectLocaleCurrent, selectLocaleList } from 'src/modules/locale/lib/selectors';
import './LocaleSelector.less';

const renderLocaleOption = (locale: string) => (
  <option key={locale} value={locale}>
    {locale}
  </option>
);

export const LocaleSelector = () => {
  const dispatch = useAppDispatch();
  const localeCurrent = useAppSelector(selectLocaleCurrent);
  const localeList = useAppSelector(selectLocaleList);

  const onLocaleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(actionLocaleSetCurrent(event.target.value));
    },
    [dispatch],
  );

  return (
    <select
      className="LocaleSelector"
      name="locale"
      onBlur={onLocaleChange}
      onChange={onLocaleChange}
      value={localeCurrent}
    >
      {localeList.map(renderLocaleOption)}
    </select>
  );
};
