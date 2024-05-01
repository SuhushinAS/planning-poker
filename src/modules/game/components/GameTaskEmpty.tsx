import {Message} from 'modules/locale/components/Message';
import React from 'react';

export const GameTaskEmpty = () => (
  <div>
    <h3>
      <Message id="gameTask.empty.title" />
    </h3>
    <p>
      <Message id="gameTask.empty.description" />
    </p>
  </div>
);
