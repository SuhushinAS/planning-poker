import {TGame} from 'modules/game/types';
import {TaskCreate} from 'modules/task/components/TaskCreate';
import {TaskList} from 'modules/task/components/TaskList';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
  userId: string;
};

export const Task = ({game, gameId, userId}: Props) => {
  const isCreator = userId === game.creatorId;

  return (
    <div>
      <div>
        <TaskList game={game} gameId={gameId} isCreator={isCreator} />
      </div>
      {isCreator && (
        <div>
          <TaskCreate creatorId={game.creatorId} gameId={gameId} />
        </div>
      )}
    </div>
  );
};
