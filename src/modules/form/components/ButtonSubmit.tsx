import {useClassName} from 'modules/common/helpers/useClassName';
import {Button} from 'modules/form/components/Button';
import React, {ButtonHTMLAttributes} from 'react';
import {useFormContext} from 'react-hook-form';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSubmit = (props: Props) => {
  const {className, disabled, ...restProps} = props;
  const {formState} = useFormContext();
  const {isDirty, isLoading, isSubmitting, isValid, isValidating} = formState;
  const buttonClassName = useClassName('Button_Primary', className);
  const isDisabled = !isDirty || isLoading || isSubmitting || !isValid || isValidating || disabled;

  return <Button className={buttonClassName} disabled={isDisabled} {...restProps} />;
};
