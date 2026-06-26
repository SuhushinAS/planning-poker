import { QueryDocumentSnapshot } from '@firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { Table } from 'src/modules/common/ui/Table';
import { TGame } from 'src/modules/game/lib/types';
import { Message } from 'src/modules/locale/ui/Message';
import { TTask } from 'src/modules/task/lib/types';
import { TaskItem } from 'src/modules/task/ui/TaskItem';

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

const getTaskData = (task: QueryDocumentSnapshot<TTask>, index: number): TaskData => {
  const data = task.data();
  const timestamp = data.createDate ?? Timestamp.fromDate(new Date());
  const sortProp = [timestamp.toMillis(), data.title].join('_');

  return { data, id: task.id, index, sortProp };
};

const sortTaskData = (a: TaskData, b: TaskData) => {
  if (a.sortProp === b.sortProp) {
    return 0;
  }

  if (a.sortProp > b.sortProp) {
    return 1;
  }

  return -1;
};

export const TaskListInner = ({ game, gameId, isCreator, taskList }: Props) => {
  const taskListSorted = useMemo(() => {
    return taskList.map(getTaskData).toSorted(sortTaskData);
  }, [taskList]);

  const renderTask = useCallback(
    (task: TaskData, index: number, taskList: TaskData[]) => {
      const taskSelect = taskList[index + 1] ?? taskList[index - 1];

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
    [game, gameId, isCreator],
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
