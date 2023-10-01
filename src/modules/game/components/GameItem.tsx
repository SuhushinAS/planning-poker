import {appPath} from 'app/constants';
import {useGame} from 'modules/game/model/useGame';
import {useGameMemberIds} from 'modules/game/model/useGameMemberIds';
import {TGame} from 'modules/game/types';
import {Task} from 'modules/task/components/Task';
import React from 'react';
import {Navigate, useParams} from 'react-router';

type GameItemContentProps = {
  game: TGame;
  gameId: string;
};

export const GameItemContent = ({game, gameId}: GameItemContentProps) => {
  useGameMemberIds(gameId);

  return (
    <div>
      <h1>{game.title}</h1>
      <div>
        <Task game={game} />
      </div>
    </div>
  );
};

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
