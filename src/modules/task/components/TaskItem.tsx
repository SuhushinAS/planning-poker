import {deleteDoc, deleteField, updateDoc} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Button} from 'modules/form/components/Button';
import {TGame} from 'modules/game/types';
import {OptionType} from 'modules/option/constants';
import 'modules/task/components/TaskItem.less';
import {TTask} from 'modules/task/types';
import {GetVoteValue, useVoteValue} from 'modules/vote/model/useVoteValue';
import React, {useCallback, useMemo} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  isCreator: boolean;
  task: TTask;
  taskId: string;
  taskIdSelect?: string;
};

const getVoteAve: GetVoteValue = (voteValueList) => Math.round(voteValueList.reduce((sum, vote) => sum + vote, 0) / voteValueList.length);

export const TaskItem = ({game, gameId, isCreator, task, taskId, taskIdSelect}: Props) => {
  const gameDocRef = useDocRef('game', gameId);
  const taskDocRef = useDocRef('task', taskId);

  const taskItemClassName = useMemo(() => {
    const classList = ['TaskItem'];

    if (taskId === game.taskId) {
      classList.push('TaskItem_Current');
    }

    return classList.join(' ');
  }, [game.taskId, taskId]);

  const voteValueList = useMemo(() => Object.values(task.votes).filter((vote) => vote !== OptionType.reset), [task.votes]);

  const voteAve = useVoteValue(voteValueList, task.isVoted, getVoteAve);

  const onTaskSelect = useCallback(() => updateDoc(gameDocRef, {taskId}), [gameDocRef, taskId]);

  const onTaskDelete = useCallback(() => {
    if (taskId === game.taskId) {
      if (taskIdSelect === undefined) {
        updateDoc(gameDocRef, {taskId: deleteField()});
      } else {
        updateDoc(gameDocRef, {taskId: taskIdSelect});
      }
    }

    return deleteDoc(taskDocRef);
  }, [game.taskId, gameDocRef, taskDocRef, taskId, taskIdSelect]);

  return (
    <tr className={taskItemClassName}>
      <td className="Table__Cell Table__Cell_Title">
        {isCreator ? (
          <Button className="Button_Primary offset_0" disabled={taskId === game.taskId} onClick={onTaskSelect} title={task.title} type="button">
            <h4 className="TaskItem__TitleInner">{task.title}</h4>
          </Button>
        ) : (
          <h4 className="TaskItem__TitleInner" title={task.title}>
            {task.title}
          </h4>
        )}
      </td>
      <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed">
        <h4 className="offset">{voteAve}</h4>
      </td>
      {isCreator && (
        <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed">
          <Button className="Button_Primary offset" onClick={onTaskDelete} type="button">
            &times;
          </Button>
        </td>
      )}
    </tr>
  );
};
