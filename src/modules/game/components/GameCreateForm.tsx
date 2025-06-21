import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {FormInput} from 'modules/form/components/FormInput';
import {Label} from 'modules/form/components/Label';
import {useMessage} from 'modules/locale/hooks';
import React from 'react';
import Message from 'react-intl/src/components/message';

export const GameCreateForm = () => {
  const placeholder = useMessage('game.new.placeholder');

  return (
    <Table
      title={
        <Label htmlFor="title">
          <Message id="game.new.label" />
        </Label>
      }
    >
      <tr>
        <td className="Form__Cell">
          <FormInput name="title" placeholder={placeholder} required={true} />
        </td>
      </tr>
      <tr>
        <td className="Form__Cell">
          <ButtonSubmit className="offset">
            <Message id="game.new.action" />
          </ButtonSubmit>
        </td>
      </tr>
    </Table>
  );
};
