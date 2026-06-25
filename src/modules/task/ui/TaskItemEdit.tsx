import { clsx } from 'clsx';
import { deleteDoc, deleteField, updateDoc } from 'firebase/firestore';
import { ReactNode, useCallback } from 'react';
import { SvgIcon } from 'src/modules/common/ui/SvgIcon';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';
import { Button } from 'src/modules/form/ui/Button';
import { TGame } from 'src/modules/game/lib/types';
import { TTask } from 'src/modules/task/lib/types';
import { TaskItemBase } from 'src/modules/task/ui/TaskItemBase';
import 'src/modules/task/ui/TaskItem.less';

type Props = {
  className: string;
  game: TGame;
  gameId: string;
  index: number;
  task: TTask;
  taskId: string;
  taskIdSelect?: string;
  voteAve: ReactNode;
};

export const TaskItemEdit = ({
  className,
  game,
  gameId,
  index,
  task,
  taskId,
  taskIdSelect,
  voteAve,
}: Props) => {
  const gameDocRef = useDocRef('game', gameId);
  const taskDocRef = useDocRef('task', taskId);

  const onTaskSelect = useCallback(() => updateDoc(gameDocRef, { taskId }), [gameDocRef, taskId]);

  const onTaskDelete = useCallback(() => {
    if (taskId === game.taskId) {
      if (taskIdSelect === undefined) {
        updateDoc(gameDocRef, { taskId: deleteField() });
      } else {
        updateDoc(gameDocRef, { taskId: taskIdSelect });
      }
    }

    return deleteDoc(taskDocRef);
  }, [game.taskId, gameDocRef, taskDocRef, taskId, taskIdSelect]);

  return (
    <TaskItemBase
      action={
        <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed">
          <Button className="Button_Danger offset_ver" onClick={onTaskDelete} type="button">
            <SvgIcon name="close" />
          </Button>
        </td>
      }
      className={clsx('TaskItem_Hover', className)}
      index={index}
      onClick={onTaskSelect}
      task={task}
      voteAve={voteAve}
    />
  );
};
