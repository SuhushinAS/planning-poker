import { clsx } from 'clsx';
import { useMemo } from 'react';
import { optionTitleMap } from 'src/modules/option/lib/constants';
import { isOption, Option } from 'src/modules/option/lib/types';
import { TUser } from 'src/modules/user/lib/types';
import { useUser } from 'src/modules/user/lib/useUser';
import { useUserGameId } from 'src/modules/user/lib/useUserGameId';
import { voteHidden } from 'src/modules/vote/lib/constants';
import 'src/modules/game/ui/GameMember.less';

type Props = {
  gameId: string;
  isCreator: boolean;
  isSelf: boolean;
  isVoted: boolean;
  memberId: string;
  votes: Record<string, number>;
};

export const GameMember = ({ gameId, isCreator, isSelf, isVoted, memberId, votes }: Props) => {
  const user = useUser(memberId);
  const userGameId = useUserGameId(memberId);

  const vote = useMemo(() => {
    const vote = votes[memberId] ?? Option.reset;

    if (Option.reset === vote) {
      return optionTitleMap[Option.reset];
    }

    if (!isVoted) {
      return voteHidden;
    }

    if (isOption(vote)) {
      return optionTitleMap[vote];
    }

    return vote;
  }, [isVoted, memberId, votes]);

  if (user === undefined || !user.exists()) {
    return null;
  }

  const { name } = user.data() as TUser;

  return (
    <tr className="GameMember">
      <td className="Table__Cell Table__Cell_Title">
        <p
          className={clsx('GameMember__Name', 'offset', {
            GameMember__Name_Creator: isCreator,
            GameMember__Name_Online: userGameId === gameId,
            GameMember__Name_Self: isSelf,
          })}
          title={name}
        >
          {name}
        </p>
      </td>
      <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed">
        <h4 className="offset_ver">{vote}</h4>
      </td>
    </tr>
  );
};
