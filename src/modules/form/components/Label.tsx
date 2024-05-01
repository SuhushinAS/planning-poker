import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  htmlFor: string;
};

export const Label = (props: Props) => {
  const {children, htmlFor} = props;

  return (
    <label className="Label" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
