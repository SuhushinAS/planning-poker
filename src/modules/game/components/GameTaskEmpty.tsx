import {Message} from 'modules/locale/components/Message';
import React from 'react';

export const GameTaskEmpty = () => (
  <div>
    <h5>
      <Message id="gameTask.empty.title" />
    </h5>
    <div>
      <Message id="gameTask.empty.description" />
    </div>
  </div>
);
