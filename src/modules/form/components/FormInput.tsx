import {Input} from 'modules/control/components/Input';
import React, {InputHTMLAttributes} from 'react';
import {useController, useFormContext} from 'react-hook-form';

type Props = InputHTMLAttributes<HTMLInputElement> & {name: string};

export const FormInput = ({className, id, name, required, ...props}: Props) => {
  const {control} = useFormContext();
  const {field} = useController({control, name, rules: {required}});

  return <Input id={id ?? name} required={required} {...field} {...props} />;
};
