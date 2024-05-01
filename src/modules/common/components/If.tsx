import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  condition: boolean;
};

export const If = (props: Props) => {
  const {children, condition} = props;

  return condition ? children : null;
};
