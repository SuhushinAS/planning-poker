import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {Input} from 'modules/form/components/Input';
import {Label} from 'modules/form/components/Label';
import {useMessage} from 'modules/locale/hooks';
import {OptionSetField} from 'modules/option/components/OptionSetField';
import {TOptionSet} from 'modules/option/types';
import React from 'react';
import Message from 'react-intl/src/components/message';

type Props = {
  optionSetList: TOptionSet[];
};

export const GameCreateForm = (props: Props) => {
  const {optionSetList} = props;
  const placeholder = useMessage('game.new.placeholder');

  return (
    <Table>
      <tr>
        <td className="Form__Cell">
          <Label htmlFor="title">
            <Message id="game.new.label" />
          </Label>
        </td>
      </tr>
      <tr>
        <td className="Form__Cell">
          <Input name="title" placeholder={placeholder} required={true} />
        </td>
      </tr>
      <OptionSetField optionSetList={optionSetList} />
      <tr>
        <td className="Form__Cell">
          <ButtonSubmit className="offset" disabled={optionSetList === undefined}>
            <Message id="game.new.action" />
          </ButtonSubmit>
        </td>
      </tr>
    </Table>
  );
};
