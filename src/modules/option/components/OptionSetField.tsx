import {useAppSelector} from 'app/hooks';
import {Option, Select} from 'modules/form/components/Select';
import {selectCurrentMessages} from 'modules/locale/selectors';
import {TOptionSet} from 'modules/option/types';
import React, {useMemo} from 'react';

type Props = {
  optionSetList: TOptionSet[];
};

export const OptionSetField = (props: Props) => {
  const {optionSetList} = props;
  const currentMessages = useAppSelector(selectCurrentMessages);

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

  if (1 >= optionSetList.length) {
    return null;
  }

  return (
    <tr>
      <td className="Form__Cell">
        <Select name="optionSetId" options={options} />
      </td>
    </tr>
  );
};
