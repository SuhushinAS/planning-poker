import {appPath} from 'app/constants';
import {GameMember} from 'modules/game/components/GameMember';
import {useGame} from 'modules/game/model/useGame';
import {useGameMemberIds} from 'modules/game/model/useGameMemberIds';
import {TGame} from 'modules/game/types';
import React from 'react';
import {Navigate, useParams} from 'react-router';

type Props = {
  game: TGame;
  gameId: string;
};

export const GameItemContent = ({game, gameId}: Props) => {
  useGameMemberIds(gameId);

  return (
    <div>
      <h1>{game.title}</h1>
      <table>
        <tbody>
          {Object.keys(game.memberIds).map((memberId) => (
            <GameMember isCreator={game.creatorId === memberId} key={memberId} memberId={memberId} />
          ))}
        </tbody>
      </table>
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
