import {GameItemTask} from 'modules/game/components/GameItemTask';
import 'modules/game/components/GameTask.less';
import {TGame} from 'modules/game/types';
import {TaskControl} from 'modules/task/components/TaskControl';
import {useTask} from 'modules/task/model/useTask';
import {TTask} from 'modules/task/types';
import React, {useMemo} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  taskId: string;
  userId: string;
};

export const GameTaskInner = ({game, gameId, taskId, userId}: Props) => {
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
      <TaskControl game={game} gameId={gameId} taskData={taskData} taskId={taskId} userId={userId} />
    </div>
  );
};
