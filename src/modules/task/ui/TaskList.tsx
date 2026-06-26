import { TGame } from 'src/modules/game/lib/types';
import { useTaskList } from 'src/modules/task/lib/useTaskList';
import { TaskEmpty } from 'src/modules/task/ui/TaskEmpty';
import { TaskListInner } from 'src/modules/task/ui/TaskListInner';

type Props = {
  game: TGame;
  gameId: string;
  isCreator: boolean;
};

export const TaskList = ({ game, gameId, isCreator }: Props) => {
  const taskList = useTaskList(gameId);

  if (taskList === undefined) {
    return null;
  }

  if (taskList.empty) {
    return <TaskEmpty />;
  }

  return (
    <TaskListInner game={game} gameId={gameId} isCreator={isCreator} taskList={taskList.docs} />
  );
};
