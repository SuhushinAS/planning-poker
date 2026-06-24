import { Navigate, useParams } from 'react-router';
import { appPath } from 'src/app/lib/constants';
import { useGame } from 'src/modules/game/lib/useGame';
import { GameItemContent } from 'src/modules/game/ui/GameItemContent';

export const GameItem = () => {
  const { gameId = '' } = useParams();
  const game = useGame(gameId);

  if (game === undefined) {
    return null;
  }

  if (!game.exists()) {
    return <Navigate to={appPath.home} />;
  }

  return <GameItemContent game={game} gameId={gameId} />;
};
