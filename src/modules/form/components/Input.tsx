import React from 'react';
import {useController, useFormContext} from 'react-hook-form';

type Props = {
  name: string;
  id?: string;
};

export const Input = ({id, name}: Props) => {
  const {control} = useFormContext();
  const {field} = useController({control, name});

  return <input className="Input" id={id ?? name} {...field} />;
};
