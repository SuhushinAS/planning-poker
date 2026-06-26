import { Empty } from 'src/modules/common/ui/Empty';
import { Message } from 'src/modules/locale/ui/Message';

type Props = {
  description: string;
  title: string;
};

export const EmptyKey = ({ description, title }: Props) => {
  return <Empty description={<Message id={description} />} title={<Message id={title} />} />;
};
