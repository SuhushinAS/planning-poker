import 'modules/game/components/GameItemContent.less';
import {GameItemControl} from 'modules/game/components/GameItemControl';
import {GameMemberList} from 'modules/game/components/GameMemberList';
import {useGameMemberIds} from 'modules/game/model/useGameMemberIds';
import {TGame} from 'modules/game/types';
import {useTask} from 'modules/task/model/useTask';
import {TTask} from 'modules/task/types';
import {useUserOnline} from 'modules/user/model/useUserOnline';
import {useUserSelf} from 'modules/user/model/useUserSelf';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
};

export const GameItemContent = ({game, gameId}: Props) => {
  useGameMemberIds(gameId);
  useUserOnline(gameId);

  const task = useTask(game.taskId);
  const userSelf = useUserSelf();

  if (userSelf === undefined || task === undefined || !task.exists()) {
    return null;
  }

  const taskData = task.data() as TTask;

  return (
    <div className="GameItemContent">
      <div className="GameItemContent__Header box">
        <h3 className="GameItemContent__Title">{game.title}</h3>
      </div>
      <div className="GameItemContent__Main box">
        <div className="box__row">
          <div className="GameItemContent__MemeberList box__col box__col_xs_12">
            <GameMemberList game={game} gameId={gameId} taskData={taskData} userSelf={userSelf} />
          </div>
          {/* <div className="GameItemContent__TaskList box__col box__col_xs_12 box__col_sm_6 box__col_md_4">
            GameItemContent__TaskList
          </div>*/}
        </div>
      </div>
      <div className="GameItemContent__Control">
        <GameItemControl game={game} taskData={taskData} userSelf={userSelf} />
      </div>
    </div>
  );
};
