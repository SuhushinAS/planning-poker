import React from 'react';

type Props = {
  control: React.ReactNode;
  label: React.ReactNode;
};

export const Field = ({control, label}: Props) => {
  return (
    <div className="Field">
      <div className="Field__Label">{label}</div>
      <div className="Field__Control">{control}</div>
    </div>
  );
};
