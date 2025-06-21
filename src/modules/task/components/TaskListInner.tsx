import {QueryDocumentSnapshot} from '@firebase/firestore';
import {Timestamp} from 'firebase/firestore';
import {Table} from 'modules/common/components/Table';
import {TGame} from 'modules/game/types';
import {Message} from 'modules/locale/components/Message';
import {TaskItem} from 'modules/task/components/TaskItem';
import {TTask} from 'modules/task/types';
import React, {useCallback, useMemo} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  isCreator: boolean;
  taskList: QueryDocumentSnapshot<TTask>[];
};

type TaskData = {
  data: TTask;
  id: string;
  index: number;
  sortProp: string;
};

const startDate = new Date(0);
const createDateDefault = Timestamp.fromDate(startDate);

const getTaskData = (task: QueryDocumentSnapshot<TTask>, index: number): TaskData => {
  const data = task.data();
  const sortProp = [data.createDate ?? createDateDefault, data.title].join('_');

  return {data, id: task.id, index, sortProp};
};

export const TaskListInner = ({game, gameId, isCreator, taskList}: Props) => {
  const taskListSorted = useMemo(() => {
    return taskList.map(getTaskData).toSorted((a, b) => {
      if (a.sortProp === b.sortProp) {
        return 0;
      }

      if (a.sortProp > b.sortProp) {
        return 1;
      }

      return -1;
    });
  }, [taskList]);

  const renderTask = useCallback(
    (task: TaskData, index: number) => {
      const taskSelect = taskListSorted[index + 1] ?? taskListSorted[index - 1];

      return (
        <TaskItem
          game={game}
          gameId={gameId}
          index={index}
          isCreator={isCreator}
          key={task.id}
          task={task.data}
          taskId={task.id}
          taskIdSelect={taskSelect?.id}
        />
      );
    },
    [game, gameId, isCreator, taskListSorted]
  );

  return (
    <Table
      title={
        <h4>
          <Message id="task.list.title" />
        </h4>
      }
    >
      {taskListSorted.map(renderTask)}
    </Table>
  );
};
