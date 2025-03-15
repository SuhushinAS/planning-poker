import 'modules/game/components/GameTask.less';
import {GameTaskEmpty} from 'modules/game/components/GameTaskEmpty';
import {GameTaskInner} from 'modules/game/components/GameTaskInner';
import {TGame} from 'modules/game/types';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
  userId: string;
};

export const GameTask = ({game, gameId, userId}: Props) => {
  if (game.taskId === undefined) {
    return <GameTaskEmpty />;
  }

  return <GameTaskInner game={game} gameId={gameId} taskId={game.taskId} userId={userId} />;
};
