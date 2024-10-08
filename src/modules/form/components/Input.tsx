import {useClassName} from 'modules/common/helpers/useClassName';
import 'modules/form/components/Input.less';
import React, {InputHTMLAttributes} from 'react';
import {useController, useFormContext} from 'react-hook-form';

type Props = InputHTMLAttributes<HTMLInputElement> & {name: string};

export const Input = (props: Props) => {
  const {className, id, name, required, ...restProps} = props;
  const {control} = useFormContext();
  const {field} = useController({control, name, rules: {required}});
  const inputClassName = useClassName('Input', className);

  return <input className={inputClassName} id={id ?? name} required={required} {...field} {...restProps} />;
};
