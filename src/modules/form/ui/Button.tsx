import { ButtonHTMLAttributes } from 'react';
import { getClassName } from 'src/modules/common/lib/getClassName';
import './Button.less';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: Props) => {
  return <button className={getClassName('Button', className)} {...props} />;
};
