import {QueryDocumentSnapshot} from '@firebase/firestore';
import {Timestamp} from 'firebase/firestore';
import {Table} from 'modules/common/components/Table';
import {TGame} from 'modules/game/types';
import {Message} from 'modules/locale/components/Message';
import {TaskItem} from 'modules/task/components/TaskItem';
import {TTask} from 'modules/task/types';
import React, {useMemo} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  isCreator: boolean;
  taskList: QueryDocumentSnapshot[];
};

const startDate = new Date(0);

const getSortProp = (data: TTask) => {
  const {createDate = Timestamp.fromDate(startDate), title} = data;

  return [createDate, title].join('_');
};

export const TaskList = ({game, gameId, isCreator, taskList}: Props) => {
  const taskListSorted = useMemo(() => {
    const taskListSorted = taskList.map((task) => ({data: task.data() as TTask, id: task.id}));

    taskListSorted.sort((a, b) => {
      const sortPropA = getSortProp(a.data);
      const sortPropB = getSortProp(b.data);

      if (sortPropA === sortPropB) {
        return 0;
      }

      if (sortPropA > sortPropB) {
        return 1;
      }

      return -1;
    });

    return taskListSorted;
  }, [taskList]);

  return (
    <Table
      title={
        <h5>
          <Message id="task.list.title" />
        </h5>
      }
    >
      {taskListSorted.map((task, index) => {
        const taskSelect = taskListSorted[index + 1] ?? taskListSorted[index - 1];

        return (
          <TaskItem
            game={game}
            gameId={gameId}
            isCreator={isCreator}
            key={task.id}
            task={task.data}
            taskId={task.id}
            taskIdSelect={taskSelect?.id}
          />
        );
      })}
    </Table>
  );
};
