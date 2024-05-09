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
      {title && <caption className="offset">{title}</caption>}
      <tbody>{children}</tbody>
    </table>
  );
};
