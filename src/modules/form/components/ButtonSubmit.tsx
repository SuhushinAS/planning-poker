import React, {ButtonHTMLAttributes} from 'react';
import {useFormContext} from 'react-hook-form';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSubmit = (props: Props) => {
  const {formState} = useFormContext();
  const {isDirty, isLoading, isSubmitting, isValid, isValidating} = formState;

  return (
    <button
      className="Button"
      disabled={!isDirty || isLoading || isSubmitting || !isValid || isValidating}
      {...props}
    />
  );
};
