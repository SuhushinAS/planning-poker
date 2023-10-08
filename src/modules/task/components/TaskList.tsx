import {QueryDocumentSnapshot} from '@firebase/firestore';
import {TGame} from 'modules/game/types';
import {Message} from 'modules/locale/components/Message';
import {TaskItem} from 'modules/task/components/TaskItem';
import 'modules/task/components/TaskList.less';
import {TTask} from 'modules/task/types';
import React, {useMemo} from 'react';

type Props = {
  game: TGame;
  gameId: string;
  isCreator: boolean;
  taskList: QueryDocumentSnapshot[];
};

export const TaskList = ({game, gameId, isCreator, taskList}: Props) => {
  const taskListSorted = useMemo(() => {
    const taskListSorted = taskList.map((task) => ({data: task.data() as TTask, id: task.id}));

    taskListSorted.sort((a, b) => {
      if (a.data.title === b.data.title) {
        return 0;
      }
      if (a.data.title > b.data.title) {
        return 1;
      }
      return -1;
    });

    return taskListSorted;
  }, [taskList]);

  return (
    <table className="TaskList">
      <caption className="GameMemberList__Title">
        <h5>
          <Message id="task.list.title" />
        </h5>
      </caption>
      <tbody>
        {taskListSorted.map((task) => {
          return (
            <TaskItem
              game={game}
              gameId={gameId}
              isCreator={isCreator}
              key={task.id}
              task={task.data}
              taskId={task.id}
            />
          );
        })}
      </tbody>
    </table>
  );
};
