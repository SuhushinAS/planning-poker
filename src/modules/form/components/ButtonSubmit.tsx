import {Button} from 'modules/form/components/Button';
import React, {ButtonHTMLAttributes} from 'react';
import {useFormContext} from 'react-hook-form';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSubmit = (props: Props) => {
  const {formState} = useFormContext();
  const {isDirty, isLoading, isSubmitting, isValid, isValidating} = formState;

  return (
    <Button
      className="Button_Primary"
      disabled={!isDirty || isLoading || isSubmitting || !isValid || isValidating}
      {...props}
    />
  );
};
