import { SelectHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Option, Select } from 'src/modules/control/ui/Select';

type Props = SelectHTMLAttributes<HTMLSelectElement> & { name: string; options: Option[] };

export const FormSelect = ({ id, name, ...props }: Props) => {
  const { control } = useFormContext();
  const { field } = useController({ control, name });

  return <Select id={id ?? name} {...field} {...props} />;
};
