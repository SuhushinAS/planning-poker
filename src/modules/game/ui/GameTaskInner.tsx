import { useMemo } from 'react';
import { TGame } from 'src/modules/game/lib/types';
import { GameItemTask } from 'src/modules/game/ui/GameItemTask';
import { TTask } from 'src/modules/task/lib/types';
import { useTask } from 'src/modules/task/lib/useTask';
import { TaskControl } from 'src/modules/task/ui/TaskControl';
import 'src/modules/game/ui/GameTask.less';

type Props = {
  game: TGame;
  gameId: string;
  taskId: string;
  userId: string;
};

export const GameTaskInner = ({ game, gameId, taskId, userId }: Props) => {
  const task = useTask(taskId);

  const taskData = useMemo(() => {
    if (task === undefined || !task.exists()) {
      return undefined;
    }

    return task.data() as TTask;
  }, [task]);

  return (
    <div className="GameTask">
      <GameItemTask game={game} gameId={gameId} taskData={taskData} userId={userId} />
      <TaskControl
        game={game}
        gameId={gameId}
        taskData={taskData}
        taskId={taskId}
        userId={userId}
      />
    </div>
  );
};
