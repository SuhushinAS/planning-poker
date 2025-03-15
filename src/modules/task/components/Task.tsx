import {TGame} from 'modules/game/types';
import {TaskCreate} from 'modules/task/components/TaskCreate';
import {TaskEmpty} from 'modules/task/components/TaskEmpty';
import {TaskList} from 'modules/task/components/TaskList';
import {useTaskList} from 'modules/task/model/useTaskList';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
  userId: string;
};

export const Task = ({game, gameId, userId}: Props) => {
  const taskList = useTaskList(gameId);
  const isCreator = userId === game.creatorId;

  if (taskList === undefined) {
    return null;
  }

  return (
    <div>
      <div>{taskList.empty ? <TaskEmpty /> : <TaskList game={game} gameId={gameId} isCreator={isCreator} taskList={taskList.docs} />}</div>
      {isCreator && (
        <div>
          <TaskCreate creatorId={game.creatorId} gameId={gameId} />
        </div>
      )}
    </div>
  );
};
