import {Empty} from 'modules/common/components/Empty';
import {Message} from 'modules/locale/components/Message';
import React from 'react';

type Props = {
  description: string;
  title: string;
};

export const EmptyKey = ({description, title}: Props) => {
  return <Empty description={<Message id={description} />} title={<Message id={title} />} />;
};
