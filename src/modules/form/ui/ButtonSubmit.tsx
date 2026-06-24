import { ButtonHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { getClassName } from 'src/modules/common/lib/getClassName';
import { Button } from 'src/modules/form/ui/Button';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSubmit = ({ className, disabled, ...props }: Props) => {
  const { formState } = useFormContext();
  const { isDirty, isLoading, isSubmitting, isValid, isValidating } = formState;
  const isDisabled = !isDirty || isLoading || isSubmitting || !isValid || isValidating || disabled;

  return (
    <Button
      className={getClassName('Button_Primary', className)}
      disabled={isDisabled}
      {...props}
    />
  );
};
