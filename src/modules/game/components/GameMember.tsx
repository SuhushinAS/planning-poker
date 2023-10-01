import 'modules/game/components/GameMember.less';
import {Message} from 'modules/locale/components/Message';
import {UNVOTED_OPTION} from 'modules/task/constants';
import {useIsUserOnline} from 'modules/user/model/useIsUserOnline';
import {useUser} from 'modules/user/model/useUser';
import {TUser} from 'modules/user/types';
import React, {useMemo} from 'react';

type Props = {
  isCreator: boolean;
  isSelf: boolean;
  memberId: string;
  selfId: string;
  votes: Record<string, number>;
};

export const GameMember = ({isCreator, isSelf, memberId, selfId, votes}: Props) => {
  const user = useUser(memberId);
  const isUserOnline = useIsUserOnline(memberId);
  const nameClassName = useMemo(() => {
    const classList = ['GameMember__name'];

    if (isCreator) {
      classList.push('GameMember__name_creator');
    }

    if (isSelf) {
      classList.push('GameMember__name_self');
    }

    return classList.join(' ');
  }, [isCreator, isSelf]);

  const vote = useMemo(() => {
    const vote = votes[memberId] ?? UNVOTED_OPTION;
    if (UNVOTED_OPTION === vote) {
      return '';
    }

    if (selfId === memberId) {
      return vote;
    }

    return '*';
  }, [memberId, selfId, votes]);

  if (user === undefined || !user.exists()) {
    return null;
  }

  const {name} = user.data() as TUser;

  return (
    <tr>
      <td className={nameClassName}>{name}</td>
      <td>{true === isUserOnline ? <Message id="user.status.online" /> : <Message id="user.status.offline" />}</td>
      <td>{vote}</td>
    </tr>
  );
};
