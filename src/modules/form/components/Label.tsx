import React from 'react';

type Props = {
  children: React.ReactNode;
  htmlFor: string;
};

export const Label = ({children, htmlFor}: Props) => {
  return (
    <label className="Label" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
