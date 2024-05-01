import {GameItemControl} from 'modules/game/components/GameItemControl';
import {GameItemTask} from 'modules/game/components/GameItemTask';
import 'modules/game/components/GameTask.less';
import {TGame} from 'modules/game/types';
import {useTask} from 'modules/task/model/useTask';
import {TTask} from 'modules/task/types';
import React, {useMemo} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  taskId: string;
  userId: string;
};

export const GameTaskInner = (props: Props) => {
  const {game, gameId, taskId, userId} = props;
  const task = useTask(taskId);

  const taskData = useMemo(() => {
    if (task === undefined || !task.exists()) {
      return undefined;
    }

    return task.data() as TTask;
  }, [task]);

  return (
    <div className="GameTask">
      <GameItemTask game={game} gameId={gameId} taskData={taskData} userId={userId} />
      <GameItemControl game={game} taskData={taskData} taskId={taskId} userId={userId} />
    </div>
  );
};
