import {useClassName} from 'modules/common/helpers/useClassName';
import React, {ReactNode, SelectHTMLAttributes} from 'react';
import './Select.less';

export type Option = {
  title: ReactNode;
  value: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};

export const Select = ({className, onChange, options, ...props}: Props) => {
  const selectClassName = useClassName('Select', className);

  return (
    <select className={selectClassName} onBlur={onChange} onChange={onChange} {...props}>
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
