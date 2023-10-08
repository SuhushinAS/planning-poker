import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {Field} from 'modules/form/components/Field';
import {Input} from 'modules/form/components/Input';
import {Label} from 'modules/form/components/Label';
import {Message} from 'modules/locale/components/Message';
import React from 'react';

export const AuthForm = () => (
  <div>
    <div>
      <Field
        control={<Input name="name" />}
        label={
          <Label htmlFor="name">
            <Message id="user.name" />
          </Label>
        }
      />
    </div>
    <div>
      <ButtonSubmit>
        <Message id="form.save" />
      </ButtonSubmit>
    </div>
  </div>
);
