import {deleteDoc, deleteField, updateDoc} from 'firebase/firestore';
import {useClassName} from 'modules/common/helpers/useClassName';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Button} from 'modules/form/components/Button';
import {TGame} from 'modules/game/types';
import 'modules/task/components/TaskItem.less';
import {TaskItemBase} from 'modules/task/components/TaskItemBase';
import {TTask} from 'modules/task/types';
import React, {useCallback} from 'react';

type Props = {
  className: string;
  game: TGame;
  gameId: string;
  index: number;
  task: TTask;
  taskId: string;
  taskIdSelect?: string;
  voteAve: string | number;
};

export const TaskItemEdit = (props: Props) => {
  const {game, gameId, index, task, taskId, taskIdSelect, voteAve} = props;
  const gameDocRef = useDocRef('game', gameId);
  const taskDocRef = useDocRef('task', taskId);

  const className = useClassName(props.className, 'TaskItem_Hover');

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
    <TaskItemBase
      action={
        <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed">
          <Button className="Button_Danger offset_ver" onClick={onTaskDelete} type="button">
            &times;
          </Button>
        </td>
      }
      className={className}
      index={index}
      onClick={onTaskSelect}
      task={task}
      voteAve={voteAve}
    />
  );
};
