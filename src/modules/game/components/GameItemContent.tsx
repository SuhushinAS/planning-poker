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

export const GameItemContent = (props: Props) => {
  const {game, gameId} = props;
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
          <h2 className="GameItemContent__Code box__col box__col_xs_12 box__col_sm_6 box__col_md_7 box__col_lg_8">{gameId}</h2>
        </div>
      </div>
      <div className="GameItemContent__Main box">
        <div className="box__row">
          <div className="box__col box__col_xs_12 box__col_sm_6 box__col_md_5 box__col_lg_4">
            <GameTask game={gameData} gameId={gameId} taskId={gameData.taskId} userId={userId} />
          </div>
          <div className="box__col box__col_xs_12 box__col_sm_6 box__col_md_7 box__col_lg_8">
            <Task creatorId={gameData.creatorId} game={gameData} gameId={gameId} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};
