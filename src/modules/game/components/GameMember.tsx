import 'modules/game/components/GameMember.less';
import {optionTitleMap, OptionType} from 'modules/option/constants';
import {useUser} from 'modules/user/model/useUser';
import {useUserGameId} from 'modules/user/model/useUserGameId';
import {TUser} from 'modules/user/types';
import {voteHidden} from 'modules/vote/constants';
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
    const classList = ['GameMember__Name', 'offset'];

    if (isCreator) {
      classList.push('GameMember__Name_Creator');
    }

    if (isSelf) {
      classList.push('GameMember__Name_Self');
    }

    if (userGameId === gameId) {
      classList.push('GameMember__Name_Online');
    }

    return classList.join(' ');
  }, [gameId, isCreator, isSelf, userGameId]);

  const vote = useMemo(() => {
    const vote = votes[memberId] ?? OptionType.reset;

    if (OptionType.reset === vote) {
      return optionTitleMap[OptionType.reset];
    }

    if (!isVoted) {
      return voteHidden;
    }

    if (OptionType[vote]) {
      return optionTitleMap[vote];
    }

    return vote;
  }, [isVoted, memberId, votes]);

  if (user === undefined || !user.exists()) {
    return null;
  }

  const {name} = user.data() as TUser;

  return (
    <tr className="GameMember">
      <td className="Table__Cell Table__Cell_Title">
        <p className={nameClassName} title={name}>
          {name}
        </p>
      </td>
      <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed">
        <h4 className="offset_ver">{vote}</h4>
      </td>
    </tr>
  );
};
