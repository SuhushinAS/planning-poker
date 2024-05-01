import {useClassName} from 'modules/common/helpers/useClassName';
import 'modules/form/components/Button.less';
import React, {ButtonHTMLAttributes} from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const {className, ...restProps} = props;
  const buttonClassName = useClassName('Button', className);

  return <button className={buttonClassName} {...restProps} />;
};
