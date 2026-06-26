import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';
import './Input.less';

type Props = ComponentPropsWithRef<'input'>;

export const Input = ({ className, id, name, ref, ...props }: Props) => {
  return (
    <input className={clsx('Input', className)} id={id ?? name} name={name} ref={ref} {...props} />
  );
};
