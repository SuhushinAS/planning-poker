import { updateDoc } from 'firebase/firestore';
import { ChangeEventHandler, useCallback, useMemo } from 'react';
import { useAppSelector } from 'src/app/lib/hooks';
import { Select } from 'src/modules/control/ui/Select';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';
import { Option } from 'src/modules/form/ui/FormSelect';
import { selectCurrentMessages } from 'src/modules/locale/lib/selectors';
import { useOptionSetList } from 'src/modules/option/lib/useOptionSet';

type Props = {
  gameId: string;
  optionSetId?: string;
};

export const OptionSetSelect = ({ gameId, optionSetId }: Props) => {
  const optionSetList = useOptionSetList();
  const currentMessages = useAppSelector(selectCurrentMessages);
  const gameDocRef = useDocRef('game', gameId);

  const options = useMemo(() => {
    return optionSetList.map<Option>((optionSet) => {
      const optionSetTitle =
        currentMessages[`optionSet.title.${optionSet.titleKey}`] ?? optionSet.title;
      const rowExample = optionSet.optionList.slice(0, 7).join(', ');

      return {
        title: `${optionSetTitle} (${rowExample}...)`,
        value: optionSet.id,
      };
    });
  }, [currentMessages, optionSetList]);

  const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      updateDoc(gameDocRef, { optionSetId: event.currentTarget.value });
    },
    [gameDocRef],
  );

  return <Select name="options" onChange={onChange} options={options} value={optionSetId} />;
};
