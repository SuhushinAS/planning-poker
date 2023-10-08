import {deleteDoc, setDoc} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {TGame} from 'modules/game/types';
import 'modules/task/components/TaskItem.less';
import {TTask} from 'modules/task/types';
import React, {useCallback, useMemo} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  isCreator: boolean;
  task: TTask;
  taskId: string;
};

export const TaskItem = ({game, gameId, isCreator, task, taskId}: Props) => {
  const gameDocRef = useDocRef('game', gameId);
  const taskDocRef = useDocRef('task', taskId);
  const onTaskSelect = useCallback(() => {
    return setDoc(gameDocRef, {...game, taskId});
  }, [game, gameDocRef, taskId]);
  const onTaskDelete = useCallback(() => deleteDoc(taskDocRef), [taskDocRef]);

  const titleClassName = useMemo(() => {
    const titleClassList = ['TaskItem__Title'];

    if (isCreator) {
      titleClassList.push('TaskItem__Button');
    }

    if (taskId === game.taskId) {
      titleClassList.push('TaskItem__Title_Current');
    }

    return titleClassList.join(' ');
  }, [game.taskId, isCreator, taskId]);

  return (
    <tr className="TaskItem">
      <td className="TaskItem__Cell TaskItem__Cell_Title">
        {isCreator ? (
          <button className={titleClassName} onClick={onTaskSelect} type="button">
            {task.title}
          </button>
        ) : (
          <span className={titleClassName}>{task.title}</span>
        )}
      </td>
      {isCreator && (
        <td className="TaskItem__Cell TaskItem__Cell_Control">
          <button className="TaskItem__Button TaskItem__Button_Control" onClick={onTaskDelete} type="button">
            &times;
          </button>
        </td>
      )}
    </tr>
  );
};
