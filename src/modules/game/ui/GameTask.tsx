import { TGame } from 'src/modules/game/lib/types';
import { GameTaskEmpty } from 'src/modules/game/ui/GameTaskEmpty';
import { GameTaskInner } from 'src/modules/game/ui/GameTaskInner';
import 'src/modules/game/ui/GameTask.less';

type Props = {
  game: TGame;
  gameId: string;
  userId: string;
};

export const GameTask = ({ game, gameId, userId }: Props) => {
  if (game.taskId === undefined) {
    return <GameTaskEmpty />;
  }

  return <GameTaskInner game={game} gameId={gameId} taskId={game.taskId} userId={userId} />;
};
