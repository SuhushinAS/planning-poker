import { ExampleHead } from 'src/modules/example/ui/ExampleHead';
import { ExampleList } from 'src/modules/example/ui/ExampleList';
import { GAME_ROOT } from 'src/modules/game/lib/constants';
import { Message } from 'src/modules/locale/ui/Message';

export const ExamplePageList = () => {
  return (
    <div className="box">
      <ExampleHead
        linkText={<Message id="home.title" />}
        linkUrl={GAME_ROOT}
        title={<Message id="example.list.title" />}
      />
      <ExampleList />
    </div>
  );
};
