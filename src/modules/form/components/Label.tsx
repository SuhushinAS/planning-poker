import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  htmlFor: string;
};

export const Label = ({children, htmlFor}: Props) => {
  return (
    <label className="Label" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
