import 'modules/form/components/Field.less';
import React, {ReactNode} from 'react';

type Props = {
  control: ReactNode;
  label: ReactNode;
};

export const Field = ({control, label}: Props) => {
  return (
    <div className="Field">
      <div className="Field__Label">{label}</div>
      <div className="Field__Control">{control}</div>
    </div>
  );
};
