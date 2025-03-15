import {useClassName} from 'modules/common/helpers/useClassName';
import 'modules/form/components/Button.less';
import React, {ButtonHTMLAttributes} from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({className, ...props}: Props) => {
  const buttonClassName = useClassName('Button', className);

  return <button className={buttonClassName} {...props} />;
};
