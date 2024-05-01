import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {Input} from 'modules/form/components/Input';
import {Label} from 'modules/form/components/Label';
import {Message} from 'modules/locale/components/Message';
import React from 'react';

export const AuthForm = () => (
  <div className="box">
    <Table>
      <tr>
        <td className="Form__Cell">
          <Label htmlFor="name">
            <Message id="user.name" />
          </Label>
        </td>
      </tr>
      <tr>
        <td className="Form__Cell">
          <Input name="name" />
        </td>
      </tr>
      <tr>
        <td className="Form__Cell">
          <ButtonSubmit className="offset">
            <Message id="form.save" />
          </ButtonSubmit>
        </td>
      </tr>
    </Table>
  </div>
);
