import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {FormInput} from 'modules/form/components/FormInput';
import {Label} from 'modules/form/components/Label';
import {Message} from 'modules/locale/components/Message';
import React from 'react';

export const AuthForm = () => (
  <div className="box">
    <Table
      title={
        <Label htmlFor="name">
          <Message id="user.name" />
        </Label>
      }
    >
      <tr>
        <td className="Form__Cell">
          <FormInput name="name" />
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
