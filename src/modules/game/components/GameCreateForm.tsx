import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {Input} from 'modules/form/components/Input';
import {Label} from 'modules/form/components/Label';
import React from 'react';
import Message from 'react-intl/src/components/message';

export const GameCreateForm = () => (
  <div className="box">
    <Table>
      <tr>
        <td className="AuthForm__Cell">
          <Label htmlFor="title">
            <Message id="game.title" />
          </Label>
        </td>
      </tr>
      <tr>
        <td className="AuthForm__Cell">
          <Input name="title" />
        </td>
      </tr>
      <tr>
        <td className="AuthForm__Cell">
          <ButtonSubmit>
            <Message id="form.save" />
          </ButtonSubmit>
        </td>
      </tr>
    </Table>
  </div>
);
