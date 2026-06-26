import { Message } from 'src/modules/locale/ui/Message';

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
