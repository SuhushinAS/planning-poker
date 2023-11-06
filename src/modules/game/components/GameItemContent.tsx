import {DocumentSnapshot} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import 'modules/game/components/GameItemContent.less';
import {GameTask} from 'modules/game/components/GameTask';
import {useGameMemberIds} from 'modules/game/model/useGameMemberIds';
import {TGame} from 'modules/game/types';
import {Task} from 'modules/task/components/Task';
import {useUserOnline} from 'modules/user/model/useUserOnline';
import React, {useMemo} from 'react';

type Props = {
  game: DocumentSnapshot;
  gameId: string;
};

export const GameItemContent = ({game, gameId}: Props) => {
  useGameMemberIds(gameId);
  useUserOnline(gameId);

  const gameData = useMemo(() => game.data() as TGame, [game]);
  const userId = useAnonymouslyContext().uid;

  return (
    <div className="GameItemContent">
      <div className="GameItemContent__Header box">
        <h3 className="GameItemContent__Title">
          {gameData.title} ({gameData.createDate.toDate().toLocaleDateString()})
        </h3>
      </div>
      <div className="GameItemContent__Main box">
        <div className="box__row">
          <div className="GameItemContent__MemeberList box__col box__col_xs_12 box__col_sm_5">
            <GameTask game={gameData} gameId={gameId} taskId={gameData.taskId} userId={userId} />
          </div>
          <div className="GameItemContent__TaskList box__col box__col_xs_12 box__col_sm_7">
            <Task creatorId={gameData.creatorId} game={gameData} gameId={gameId} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};
