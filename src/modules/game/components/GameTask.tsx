import {GameItemControl} from 'modules/game/components/GameItemControl';
import {GameItemTask} from 'modules/game/components/GameItemTask';
import {GameTaskEmpty} from 'modules/game/components/GameTaskEmpty';
import {TGame} from 'modules/game/types';
import {useTask} from 'modules/task/model/useTask';
import {TTask} from 'modules/task/types';
import React, {useMemo} from 'react';

type GameTaskInnerProps = {
  game: TGame;
  gameId: string;
  taskId: string;
  userId: string;
};

export const GameTaskInner = ({game, gameId, taskId, userId}: GameTaskInnerProps) => {
  const task = useTask(taskId);

  const taskData = useMemo(() => {
    if (task === undefined || !task.exists()) {
      return undefined;
    }

    return task.data() as TTask;
  }, [task]);

  return (
    <>
      <GameItemTask game={game} gameId={gameId} taskData={taskData} userId={userId} />
      <GameItemControl game={game} taskData={taskData} taskId={taskId} userId={userId} />
    </>
  );
};

type GameTaskProps = {
  game: TGame;
  gameId: string;
  taskId?: string;
  userId: string;
};

export const GameTask = ({game, gameId, taskId, userId}: GameTaskProps) => {
  if (taskId === undefined) {
    return <GameTaskEmpty />;
  }

  return <GameTaskInner game={game} gameId={gameId} taskId={taskId} userId={userId} />;
};
