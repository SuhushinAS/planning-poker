import React, {ReactNode} from 'react';

type Props = {
  description: ReactNode;
  title: ReactNode;
};

export const Empty = ({description, title}: Props) => (
  <div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
