import 'modules/game/components/GameTask.less';
import {GameTaskEmpty} from 'modules/game/components/GameTaskEmpty';
import {GameTaskInner} from 'modules/game/components/GameTaskInner';
import {TGame} from 'modules/game/types';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
  taskId?: string;
  userId: string;
};

export const GameTask = (props: Props) => {
  const {game, gameId, taskId, userId} = props;

  if (taskId === undefined) {
    return <GameTaskEmpty />;
  }

  return <GameTaskInner game={game} gameId={gameId} taskId={taskId} userId={userId} />;
};
