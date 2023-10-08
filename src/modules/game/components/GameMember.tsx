import 'modules/game/components/GameMember.less';
import {UNVOTED_OPTION} from 'modules/task/constants';
import {useUser} from 'modules/user/model/useUser';
import {useUserGameId} from 'modules/user/model/useUserGameId';
import {TUser} from 'modules/user/types';
import React, {useMemo} from 'react';

type Props = {
  gameId: string;
  isCreator: boolean;
  isSelf: boolean;
  isVoted: boolean;
  memberId: string;
  votes: Record<string, number>;
};

export const GameMember = ({gameId, isCreator, isSelf, isVoted, memberId, votes}: Props) => {
  const user = useUser(memberId);
  const userGameId = useUserGameId(memberId);
  const nameClassName = useMemo(() => {
    const classList = ['GameMember__Name'];

    if (isCreator) {
      classList.push('GameMember__Name_Creator');
    }

    if (isSelf) {
      classList.push('GameMember__Name_Self');
    }

    return classList.join(' ');
  }, [isCreator, isSelf]);

  const vote = useMemo(() => {
    const vote = votes[memberId] ?? UNVOTED_OPTION;
    if (UNVOTED_OPTION === vote) {
      return '';
    }

    if (isVoted) {
      return vote;
    }

    return '#';
  }, [isVoted, memberId, votes]);

  if (user === undefined || userGameId !== gameId || !user.exists()) {
    return null;
  }

  const {name} = user.data() as TUser;

  return (
    <tr className="GameMember">
      <td className="GameMember__Cell GameMember__Cell_Name">
        <p className={nameClassName} title={name}>
          {name}
        </p>
      </td>
      <td className="GameMember__Cell GameMember__Cell_Vote">
        <p>{vote}</p>
      </td>
    </tr>
  );
};
