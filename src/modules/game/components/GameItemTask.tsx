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

export const GameItemTask = (props: Props) => {
  const {game, gameId, taskData, userId} = props;

  if (taskData === undefined) {
    return null;
  }

  return <GameMemberList game={game} gameId={gameId} taskData={taskData} title={taskData.title} userId={userId} />;
};
