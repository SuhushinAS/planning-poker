import { InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Input } from 'src/modules/control/ui/Input';

type Props = InputHTMLAttributes<HTMLInputElement> & { name: string };

export const FormInput = ({ className, name, required, ...props }: Props) => {
  const { control } = useFormContext();
  const { field } = useController({ control, name, rules: { required } });

  return <Input required={required} {...field} {...props} />;
};
