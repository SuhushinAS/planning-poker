import {Message} from 'modules/locale/components/Message';
import {useIsUserOnline} from 'modules/user/model/useIsUserOnline';
import {useUser} from 'modules/user/model/useUser';
import {TUser} from 'modules/user/types';
import React from 'react';

type Props = {
  isCreator: boolean;
  memberId: string;
};

export const GameMember = ({isCreator, memberId}: Props) => {
  const user = useUser(memberId);
  const isUserOnline = useIsUserOnline(memberId);

  if (user === undefined || !user.exists()) {
    return null;
  }

  const {name} = user.data() as TUser;

  return (
    <tr>
      <td>{isCreator ? <strong>{name}</strong> : name}</td>
      <td>{true === isUserOnline ? <Message id="user.status.online" /> : <Message id="user.status.offline" />}</td>
    </tr>
  );
};
