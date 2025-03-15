import {useAppSelector} from 'app/hooks';
import {updateDoc} from 'firebase/firestore';
import {Select} from 'modules/control/components/Select';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Option} from 'modules/form/components/FormSelect';
import {selectCurrentMessages} from 'modules/locale/selectors';
import {useOptionSetList} from 'modules/option/model/useOptionSet';
import React, {useCallback, useMemo} from 'react';

type Props = {
  gameId: string;
  optionSetId?: string;
};

export const OptionSetSelect = ({gameId, optionSetId}: Props) => {
  const optionSetList = useOptionSetList();
  const currentMessages = useAppSelector(selectCurrentMessages);
  const gameDocRef = useDocRef('game', gameId);

  const options = useMemo(() => {
    return optionSetList.map<Option>((optionSet) => {
      const optionSetTitle = currentMessages[`optionSet.title.${optionSet.titleKey}`] ?? optionSet.title;
      const rowExample = optionSet.optionList.slice(0, 7).join(', ');

      return {
        title: `${optionSetTitle} (${rowExample}...)`,
        value: optionSet.id,
      };
    });
  }, [currentMessages, optionSetList]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      updateDoc(gameDocRef, {optionSetId: event.currentTarget.value});
    },
    [gameDocRef]
  );

  return <Select onChange={onChange} options={options} value={optionSetId} />;
};
