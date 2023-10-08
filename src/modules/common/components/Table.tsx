import 'modules/common/components/Table.less';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  title?: ReactNode;
};

export const Table = ({children, title}: Props) => (
  <table className="Table">
    {title && <caption className="Table__Title">{title}</caption>}
    <tbody>{children}</tbody>
  </table>
);
