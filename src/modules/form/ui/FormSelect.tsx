import { ReactNode, SelectHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Select } from 'src/modules/control/ui/Select';

export type Option = {
  title: ReactNode;
  value: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & { name: string; options: Option[] };

export const FormSelect = ({ id, name, ...props }: Props) => {
  const { control } = useFormContext();
  const { field } = useController({ control, name });

  return <Select id={id ?? name} {...field} {...props} />;
};
