import 'modules/common/components/Table.less';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  title?: ReactNode;
};

export const Table = (props: Props) => {
  const {children, title} = props;

  return (
    <table className="Table">
      {title && <caption className="Table__Title">{title}</caption>}
      <tbody>{children}</tbody>
    </table>
  );
};
