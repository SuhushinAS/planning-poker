import { ReactNode, SelectHTMLAttributes } from 'react';
import { getClassName } from 'src/modules/common/lib/getClassName';
import './Select.less';

export type Option = {
  title: ReactNode;
  value: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};

export const Select = ({ className, id, name, onChange, options, ...props }: Props) => {
  return (
    <select
      autoComplete={name}
      className={getClassName('Select', className)}
      id={id ?? name}
      name={name}
      onBlur={onChange}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        );
      })}
    </select>
  );
};
