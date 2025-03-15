import {GameMemberList} from 'modules/game/components/GameMemberList';
import {TGame} from 'modules/game/types';
import {TTask} from 'modules/task/types';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
  taskData?: TTask;
  userId: string;
};

export const GameItemTask = ({game, gameId, taskData, userId}: Props) => {
  if (taskData === undefined) {
    return null;
  }

  return <GameMemberList game={game} gameId={gameId} taskData={taskData} title={taskData.title} userId={userId} />;
};
