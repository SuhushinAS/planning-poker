import {updateDoc} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Button} from 'modules/form/components/Button';
import {TGame} from 'modules/game/types';
import 'modules/task/components/TaskItem.less';
import {TTask} from 'modules/task/types';
import React, {useCallback} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  isCreator: boolean;
  task: TTask;
  taskId: string;
};

export const TaskItemTitle = (props: Props) => {
  const {game, gameId, isCreator, task, taskId} = props;
  const gameDocRef = useDocRef('game', gameId);

  const onTaskSelect = useCallback(() => updateDoc(gameDocRef, {taskId}), [gameDocRef, taskId]);

  if (taskId === game.taskId) {
    return (
      <h4 className="TaskItem__Title" title={task.title}>
        {task.title}
      </h4>
    );
  }

  if (isCreator) {
    return (
      <Button className="offset_0" disabled={taskId === game.taskId} onClick={onTaskSelect} title={task.title} type="button">
        <h4 className="TaskItem__Title">{task.title}</h4>
      </Button>
    );
  }

  return (
    <h4 className="TaskItem__Title" title={task.title}>
      {task.title}
    </h4>
  );
};
