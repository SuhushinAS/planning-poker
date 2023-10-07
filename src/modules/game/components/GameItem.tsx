import {appPath} from 'app/constants';
import {GameItemContent} from 'modules/game/components/GameItemContent';
import {useGame} from 'modules/game/model/useGame';
import {TGame} from 'modules/game/types';
import React from 'react';
import {Navigate, useParams} from 'react-router';

export const GameItem = () => {
  const {gameId = ''} = useParams();
  const game = useGame(gameId);

  if (game === undefined) {
    return null;
  }

  if (!game.exists()) {
    return <Navigate to={appPath.home} />;
  }

  return <GameItemContent game={game.data() as TGame} gameId={gameId} />;
};
