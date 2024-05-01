import {Message} from 'modules/locale/components/Message';
import React from 'react';

export const TaskEmpty = () => (
  <div>
    <h3>
      <Message id="task.empty.title" />
    </h3>
    <p>
      <Message id="task.empty.description" />
    </p>
  </div>
);
