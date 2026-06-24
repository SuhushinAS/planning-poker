import { useMemo } from 'react';
import { TGame } from 'src/modules/game/lib/types';
import { Option } from 'src/modules/option/lib/types';
import { TTask } from 'src/modules/task/lib/types';
import { TaskItemBase } from 'src/modules/task/ui/TaskItemBase';
import { TaskItemEdit } from 'src/modules/task/ui/TaskItemEdit';
import { GetVoteValue, useVoteValue } from 'src/modules/vote/lib/useVoteValue';
import 'src/modules/task/ui/TaskItem.less';

type Props = {
  game: TGame;
  gameId: string;
  index: number;
  isCreator: boolean;
  task: TTask;
  taskId: string;
  taskIdSelect?: string;
};

const getVoteAve: GetVoteValue = (voteValueList) =>
  Math.round(voteValueList.reduce((sum, vote) => sum + vote, 0) / voteValueList.length);

export const TaskItem = ({ game, gameId, index, isCreator, task, taskId, taskIdSelect }: Props) => {
  const className = useMemo(() => {
    const classList = ['TaskItem', 'TaskItem_Hover'];

    if (taskId === game.taskId) {
      classList.push('TaskItem_Current');
    }

    return classList.join(' ');
  }, [game.taskId, taskId]);

  const voteValueList = useMemo(
    () => Object.values(task.votes).filter((vote) => vote !== Option.reset),
    [task.votes],
  );

  const voteAve = useVoteValue(voteValueList, task.isVoted, getVoteAve);

  if (isCreator) {
    return (
      <TaskItemEdit
        className={className}
        game={game}
        gameId={gameId}
        index={index}
        task={task}
        taskId={taskId}
        taskIdSelect={taskIdSelect}
        voteAve={voteAve}
      />
    );
  }

  return <TaskItemBase className={className} index={index} task={task} voteAve={voteAve} />;
};
