import { TGame } from 'src/modules/game/lib/types';
import { GameRevealButton } from 'src/modules/game/ui/GameRevealButton';
import { OptionSetSelect } from 'src/modules/option/ui/OptionSetSelect';
import { TTask } from 'src/modules/task/lib/types';
import { VoteList } from 'src/modules/vote/ui/VoteList';
import './TaskControl.less';

type Props = {
  game: TGame;
  gameId: string;
  taskData?: TTask;
  taskId: string;
  userId: string;
};

export const TaskControl = ({ game, gameId, taskData, taskId, userId }: Props) => {
  if (taskData === undefined) {
    return null;
  }

  return (
    <div className="TaskControl">
      {game.creatorId === userId && (
        <div className="TaskControl__Row">
          <div className="TaskControl__Item">
            <OptionSetSelect gameId={gameId} optionSetId={game.optionSetId} />
          </div>
        </div>
      )}
      {taskData && <VoteList game={game} taskData={taskData} taskId={taskId} userId={userId} />}
      {game.creatorId === userId && (
        <div className="TaskControl__Row">
          <div className="TaskControl__Item">
            <GameRevealButton isVoted={taskData.isVoted} taskId={taskId} votes={taskData.votes} />
          </div>
        </div>
      )}
    </div>
  );
};
