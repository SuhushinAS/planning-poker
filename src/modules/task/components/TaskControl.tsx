import {GameRevealButton} from 'modules/game/components/GameRevealButton';
import {TGame} from 'modules/game/types';
import {OptionSetSelect} from 'modules/option/components/OptionSetSelect';
import {TTask} from 'modules/task/types';
import React from 'react';
import './TaskControl.less';
import {VoteList} from '../../vote/components/VoteList';

type Props = {
  game: TGame;
  gameId: string;
  taskData?: TTask;
  taskId: string;
  userId: string;
};

export const TaskControl = ({game, gameId, taskData, taskId, userId}: Props) => {
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
