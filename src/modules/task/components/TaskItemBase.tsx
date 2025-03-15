import {noop, Noop} from 'modules/common/helpers/noop';
import 'modules/task/components/TaskItem.less';
import {TTask} from 'modules/task/types';
import React, {ReactNode} from 'react';

type Props = {
  action?: ReactNode;
  className: string;
  index: number;
  onClick?: Noop;
  task: TTask;
  voteAve: string | number;
};

export const TaskItemBase = ({action, className, index, onClick = noop, task, voteAve}: Props) => {
  return (
    <tr className={className}>
      <td className="TaskItem__Cell Table__Cell Table__Cell_Control Table__Cell_Control_Fixed" onClick={onClick}>
        <p className="offset_ver">{index + 1}</p>
      </td>
      <td className="TaskItem__Cell Table__Cell Table__Cell_Title" onClick={onClick}>
        <p className="TaskItem__Title" title={task.title}>
          {task.title}
        </p>
      </td>
      <td className="TaskItem__Cell Table__Cell Table__Cell_Control Table__Cell_Control_Fixed" onClick={onClick}>
        <p className="offset_ver">{voteAve}</p>
      </td>
      {action}
    </tr>
  );
};
