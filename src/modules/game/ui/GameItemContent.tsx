import { DocumentSnapshot } from 'firebase/firestore';
import { useMemo } from 'react';
import { useAnonymouslyContext } from 'src/modules/firebase/ui/Anonymously';
import { TGame } from 'src/modules/game/lib/types';
import { useGameMemberIds } from 'src/modules/game/lib/useGameMemberIds';
import { GameTask } from 'src/modules/game/ui/GameTask';
import { Task } from 'src/modules/task/ui/Task';
import { useUserOnline } from 'src/modules/user/lib/useUserOnline';
import 'src/modules/game/ui/GameItemContent.less';

type Props = {
  game: DocumentSnapshot;
  gameId: string;
};

export const GameItemContent = ({ game, gameId }: Props) => {
  useGameMemberIds(gameId);
  useUserOnline(gameId);

  const gameData = useMemo(() => game.data() as TGame, [game]);
  const userId = useAnonymouslyContext().uid;

  return (
    <div className="GameItemContent">
      <div className="GameItemContent__Header box">
        <div className="box__row">
          <h2 className="GameItemContent__Title box__col box__col_xs_12 box__col_sm_6 box__col_md_5 box__col_lg_4">
            {gameData.title} ({gameData.createDate.toDate().toLocaleDateString()})
          </h2>
          <h2 className="GameItemContent__Code box__col box__col_xs_12 box__col_sm_6 box__col_md_7 box__col_lg_8">
            {gameId}
          </h2>
        </div>
      </div>
      <div className="GameItemContent__Main box">
        <div className="box__row">
          <div className="box__col box__col_xs_12 box__col_sm_6 box__col_md_5 box__col_lg_4">
            <GameTask game={gameData} gameId={gameId} userId={userId} />
          </div>
          <div className="box__col box__col_xs_12 box__col_sm_6 box__col_md_7 box__col_lg_8">
            <Task game={gameData} gameId={gameId} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};
