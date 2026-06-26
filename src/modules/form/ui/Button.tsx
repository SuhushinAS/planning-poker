import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import './Button.less';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: Props) => {
  return <button className={clsx('Button', className)} {...props} />;
};
