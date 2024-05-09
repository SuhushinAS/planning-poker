import {TGame} from 'modules/game/types';
import {OptionType} from 'modules/option/constants';
import 'modules/task/components/TaskItem.less';
import {TaskItemBase} from 'modules/task/components/TaskItemBase';
import {TaskItemEdit} from 'modules/task/components/TaskItemEdit';
import {TTask} from 'modules/task/types';
import {GetVoteValue, useVoteValue} from 'modules/vote/model/useVoteValue';
import React, {useMemo} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  index: number;
  isCreator: boolean;
  task: TTask;
  taskId: string;
  taskIdSelect?: string;
};

const getVoteAve: GetVoteValue = (voteValueList) => Math.round(voteValueList.reduce((sum, vote) => sum + vote, 0) / voteValueList.length);

export const TaskItem = (props: Props) => {
  const {game, gameId, index, isCreator, task, taskId, taskIdSelect} = props;

  const className = useMemo(() => {
    const classList = ['TaskItem', 'TaskItem_Hover'];

    if (taskId === game.taskId) {
      classList.push('TaskItem_Current');
    }

    return classList.join(' ');
  }, [game.taskId, taskId]);

  const voteValueList = useMemo(() => Object.values(task.votes).filter((vote) => vote !== OptionType.reset), [task.votes]);

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
