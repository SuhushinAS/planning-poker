import { TGame } from 'src/modules/game/lib/types';
import { GameMemberList } from 'src/modules/game/ui/GameMemberList';
import { TTask } from 'src/modules/task/lib/types';

type Props = {
  game: TGame;
  gameId: string;
  taskData?: TTask;
  userId: string;
};

export const GameItemTask = ({ game, gameId, taskData, userId }: Props) => {
  if (taskData === undefined) {
    return null;
  }

  return (
    <GameMemberList
      game={game}
      gameId={gameId}
      taskData={taskData}
      title={taskData.title}
      userId={userId}
    />
  );
};
