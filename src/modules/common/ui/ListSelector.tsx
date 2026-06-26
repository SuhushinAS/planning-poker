import { clsx } from 'clsx';
import { ReactNode, useCallback, useMemo } from 'react';
import { getIndexMap } from 'src/modules/common/lib/getIndexMap';
import { getNextItem } from 'src/modules/common/lib/getNextItem';
import { TValue } from 'src/modules/common/lib/types';
import './ListSelector.less';

const renderItemDefault = <T extends TValue>(item: T): ReactNode => item;

type Props<T extends TValue> = {
  itemCurrent: T;
  itemList: T[];
  onChange: (itemNext: T) => void;
  renderItem?: (item: T) => ReactNode;
};

export const ListSelector = <T extends TValue>({
  itemCurrent,
  itemList,
  onChange,
  renderItem = renderItemDefault,
}: Props<T>) => {
  const indexMap = useMemo(() => getIndexMap(itemList), [itemList]);

  const onItemChange = useCallback(() => {
    const index = indexMap[itemCurrent];
    const itemNext = getNextItem(itemList, index);

    onChange(itemNext);
  }, [indexMap, itemCurrent, itemList, onChange]);

  return (
    <button className="ListSelector" onClick={onItemChange} type="button">
      {itemList.map((item) => (
        <div
          className={clsx('ListSelector__Item', {
            ListSelector__Item_Current: item === itemCurrent,
          })}
          key={item}
        >
          {renderItem(item)}
        </div>
      ))}
    </button>
  );
};
