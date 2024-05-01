import {useClassName} from 'modules/common/helpers/useClassName';
import {Button} from 'modules/form/components/Button';
import React, {ButtonHTMLAttributes} from 'react';
import {useFormContext} from 'react-hook-form';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSubmit = ({className, ...props}: Props) => {
  const {formState} = useFormContext();
  const {isDirty, isLoading, isSubmitting, isValid, isValidating} = formState;
  const buttonClassName = useClassName('Button_Primary', className);

  return <Button className={buttonClassName} disabled={!isDirty || isLoading || isSubmitting || !isValid || isValidating} {...props} />;
};
