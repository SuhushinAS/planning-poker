import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {Input} from 'modules/form/components/Input';
import {Label} from 'modules/form/components/Label';
import {Message} from 'modules/locale/components/Message';
import 'modules/user/components/AuthForm.less';
import React from 'react';

export const AuthForm = () => (
  <div className="box">
    <Table>
      <tr>
        <td className="AuthForm__Cell">
          <Label htmlFor="name">
            <Message id="user.name" />
          </Label>
        </td>
      </tr>
      <tr>
        <td className="AuthForm__Cell">
          <Input name="name" />
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
