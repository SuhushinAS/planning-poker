import 'modules/common/components/Table.less';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  title?: ReactNode;
};

export const Table = ({children, title}: Props) => {
  return (
    <table className="Table">
      {title && <caption>{title}</caption>}
      <tbody>{children}</tbody>
    </table>
  );
};
