import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {FormInput} from 'modules/form/components/FormInput';
import {Label} from 'modules/form/components/Label';
import {useMessage} from 'modules/locale/hooks';
import React from 'react';
import Message from 'react-intl/src/components/message';

export const GameJoinForm = () => {
  const placeholder = useMessage('game.join.placeholder');

  return (
    <Table>
      <tr>
        <td className="Form__Cell">
          <Label htmlFor="title">
            <Message id="game.join.label" />
          </Label>
        </td>
      </tr>
      <tr>
        <td className="Form__Cell">
          <FormInput name="gameId" placeholder={placeholder} required={true} />
        </td>
      </tr>
      <tr>
        <td className="Form__Cell">
          <ButtonSubmit className="offset">
            <Message id="game.join.action" />
          </ButtonSubmit>
        </td>
      </tr>
    </Table>
  );
};
