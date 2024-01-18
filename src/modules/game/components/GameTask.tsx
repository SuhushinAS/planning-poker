import {GameItemControl} from 'modules/game/components/GameItemControl';
import {GameItemTask} from 'modules/game/components/GameItemTask';
import {GameTaskEmpty} from 'modules/game/components/GameTaskEmpty';
import {TGame} from 'modules/game/types';
import {useTask} from 'modules/task/model/useTask';
import {TTask} from 'modules/task/types';
import React, {useMemo} from 'react';

type GameTaskInnerProps = {
  game: TGame;
  taskId: string;
  userId: string;
};

export const GameTaskInner = ({game, taskId, userId}: GameTaskInnerProps) => {
  const task = useTask(taskId);

  const taskData = useMemo(() => {
    if (task === undefined || !task.exists()) {
      return undefined;
    }

    return task.data() as TTask;
  }, [task]);

  return (
    <>
      <GameItemTask game={game} taskData={taskData} userId={userId} />
      <GameItemControl game={game} taskData={taskData} taskId={taskId} userId={userId} />
    </>
  );
};

type GameTaskProps = {
  game: TGame;
  taskId?: string;
  userId: string;
};

export const GameTask = ({game, taskId, userId}: GameTaskProps) => {
  if (taskId === undefined) {
    return <GameTaskEmpty />;
  }

  return <GameTaskInner game={game} taskId={taskId} userId={userId} />;
};
