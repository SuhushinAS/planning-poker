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

export const TaskItemBase = (props: Props) => {
  const {action, className, index, onClick = noop, task, voteAve} = props;

  return (
    <tr className={className}>
      <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed" onClick={onClick}>
        <h4 className="offset_ver">{index + 1}</h4>
      </td>
      <td className="Table__Cell Table__Cell_Title" onClick={onClick}>
        <h4 className="TaskItem__Title" title={task.title}>
          {task.title}
        </h4>
      </td>
      <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed" onClick={onClick}>
        <h4 className="offset_ver">{voteAve}</h4>
      </td>
      {action}
    </tr>
  );
};
