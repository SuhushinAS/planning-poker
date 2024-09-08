import {useClassName} from 'modules/common/helpers/useClassName';
import React, {ReactNode, SelectHTMLAttributes} from 'react';
import {useController, useFormContext} from 'react-hook-form';
import './Select.less';

export type Option = {
  title: ReactNode;
  value: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {name: string; options: Option[]};

export const Select = (props: Props) => {
  const {className, id, name, options, ...restProps} = props;
  const {control} = useFormContext();
  const {field} = useController({control, name});
  const selectClassName = useClassName('Select', className);

  return (
    <select className={selectClassName} id={id ?? name} {...field} {...restProps}>
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
