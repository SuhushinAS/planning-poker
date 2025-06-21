import {TGame} from 'modules/game/types';
import {TaskEmpty} from 'modules/task/components/TaskEmpty';
import {TaskListInner} from 'modules/task/components/TaskListInner';
import {useTaskList} from 'modules/task/model/useTaskList';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
  isCreator: boolean;
};

export const TaskList = ({game, gameId, isCreator}: Props) => {
  const taskList = useTaskList(gameId);

  if (taskList === undefined) {
    return null;
  }

  if (taskList.empty) {
    return <TaskEmpty />;
  }

  return <TaskListInner game={game} gameId={gameId} isCreator={isCreator} taskList={taskList.docs} />;
};
