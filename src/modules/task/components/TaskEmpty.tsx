import {Message} from 'modules/locale/components/Message';
import React from 'react';

export const TaskEmpty = () => (
  <div>
    <h5>
      <Message id="task.empty.title" />
    </h5>
    <div>
      <Message id="task.empty.description" />
    </div>
  </div>
);
