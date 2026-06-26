import { clsx } from 'clsx';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import './Input.less';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  ({ className, id, name, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        autoComplete={name}
        className={clsx('Input', className)}
        id={id ?? name}
        name={name}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
