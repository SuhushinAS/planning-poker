import 'modules/game/components/GameMember.less';
import {Message} from 'modules/locale/components/Message';
import {UNVOTED_OPTION} from 'modules/task/constants';
import {useUserGameId} from 'modules/user/model/useUserGameId';
import {useUser} from 'modules/user/model/useUser';
import {TUser} from 'modules/user/types';
import React, {useMemo} from 'react';

type Props = {
  gameId: string;
  isCreator: boolean;
  isSelf: boolean;
  isVoted: boolean;
  memberId: string;
  selfId: string;
  votes: Record<string, number>;
};

export const GameMember = ({gameId, isCreator, isSelf, isVoted, memberId, selfId, votes}: Props) => {
  const user = useUser(memberId);
  const userGameId = useUserGameId(memberId);
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

    if (isVoted) {
      return vote;
    }

    return '*';
  }, [isVoted, memberId, selfId, votes]);

  if (user === undefined || userGameId !== gameId || !user.exists()) {
    return null;
  }

  const {name} = user.data() as TUser;

  return (
    <tr>
      <td className={nameClassName}>{name}</td>
      <td>{undefined === userGameId ? <Message id="user.status.offline" /> : <Message id="user.status.online" />}</td>
      <td>{vote}</td>
    </tr>
  );
};
