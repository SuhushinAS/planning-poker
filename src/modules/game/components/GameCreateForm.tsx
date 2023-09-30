import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {Field} from 'modules/form/components/Field';
import {Input} from 'modules/form/components/Input';
import {Label} from 'modules/form/components/Label';
import React from 'react';
import Message from 'react-intl/src/components/message';

export const GameCreateForm = () => {
  return (
    <>
      <Field
        control={<Input name="title" />}
        label={
          <Label htmlFor="title">
            <Message id="game.title" />
          </Label>
        }
      />
      <div>
        <ButtonSubmit>
          <Message id="form.save" />
        </ButtonSubmit>
      </div>
    </>
  );
};
