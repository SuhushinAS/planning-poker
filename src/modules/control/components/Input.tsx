import {useClassName} from 'modules/common/helpers/useClassName';
import './Input.less';
import React, {InputHTMLAttributes, LegacyRef} from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef(({className, ...props}: Props, ref: LegacyRef<HTMLInputElement>) => {
  const inputClassName = useClassName('Input', className);

  return <input className={inputClassName} ref={ref} {...props} />;
});

Input.displayName = 'Input';
