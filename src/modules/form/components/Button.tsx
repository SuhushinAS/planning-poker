import 'modules/form/components/Button.less';
import React, {ButtonHTMLAttributes, useMemo} from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({className = '', ...props}: Props) => {
  const buttonClassName = useMemo(() => {
    const buttonClassList = className.split(' ');

    buttonClassList.push('Button');

    return buttonClassList.join(' ');
  }, [className]);

  return <button className={buttonClassName} {...props} />;
};
