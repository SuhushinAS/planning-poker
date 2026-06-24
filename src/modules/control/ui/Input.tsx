import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import { getClassName } from 'src/modules/common/lib/getClassName';
import './Input.less';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  ({ className, id, name, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        autoComplete={name}
        className={getClassName('Input', className)}
        id={id ?? name}
        name={name}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
