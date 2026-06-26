import { TGame } from 'src/modules/game/lib/types';
import { TaskCreate } from 'src/modules/task/ui/TaskCreate';
import { TaskList } from 'src/modules/task/ui/TaskList';

type Props = {
  game: TGame;
  gameId: string;
  userId: string;
};

export const Task = ({ game, gameId, userId }: Props) => {
  const isCreator = userId === game.creatorId;

  return (
    <div>
      <div>
        <TaskList game={game} gameId={gameId} isCreator={isCreator} />
      </div>
      {isCreator && (
        <div>
          <TaskCreate creatorId={game.creatorId} gameId={gameId} />
        </div>
      )}
    </div>
  );
};
