import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/lib/hooks';
import { ListSelector } from 'src/modules/common/ui/ListSelector';
import { actionLocaleSetCurrent } from 'src/modules/locale/lib/actions';
import { selectLocaleCurrent, selectLocaleList } from 'src/modules/locale/lib/selectors';

export const LocaleSelector = () => {
  const dispatch = useAppDispatch();
  const localeCurrent = useAppSelector(selectLocaleCurrent);
  const localeList = useAppSelector(selectLocaleList);

  const onLocaleChange = useCallback(
    (localeNext: string) => {
      dispatch(actionLocaleSetCurrent(localeNext));
    },
    [dispatch],
  );

  return (
    <ListSelector itemCurrent={localeCurrent} itemList={localeList} onChange={onLocaleChange} />
  );
};
