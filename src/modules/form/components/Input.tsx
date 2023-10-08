import React, {InputHTMLAttributes} from 'react';
import {useController, useFormContext} from 'react-hook-form';

type Props = InputHTMLAttributes<HTMLInputElement> & {name: string};

export const Input = ({id, name, ...props}: Props) => {
  const {control} = useFormContext();
  const {field} = useController({control, name});

  return <input className="Input" id={id ?? name} {...field} {...props} />;
};
