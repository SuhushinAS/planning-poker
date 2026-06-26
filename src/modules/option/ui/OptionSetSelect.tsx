import { updateDoc } from 'firebase/firestore';
import { ChangeEventHandler, useCallback, useMemo } from 'react';
import { Select } from 'src/modules/control/ui/Select';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';
import { Option } from 'src/modules/form/ui/FormSelect';
import { useGetMessage } from 'src/modules/locale/lib/useGetMessage';
import { useOptionSetList } from 'src/modules/option/lib/useOptionSet';

type Props = {
  gameId: string;
  optionSetId?: string;
};

export const OptionSetSelect = ({ gameId, optionSetId }: Props) => {
  const optionSetList = useOptionSetList();
  const getMessage = useGetMessage();
  const gameDocRef = useDocRef('game', gameId);

  const options = useMemo(() => {
    return optionSetList.map<Option>(({ id, optionList, titleKey, title }) => {
      const optionSetTitle = getMessage(`optionSet.title.${titleKey}`) ?? title;
      const rowExample = optionList.slice(0, 7).join(', ');

      return {
        title: `${optionSetTitle} (${rowExample}...)`,
        value: id,
      };
    });
  }, [getMessage, optionSetList]);

  const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      return updateDoc(gameDocRef, { optionSetId: event.currentTarget.value });
    },
    [gameDocRef],
  );

  return <Select name="options" onChange={onChange} options={options} value={optionSetId} />;
};
