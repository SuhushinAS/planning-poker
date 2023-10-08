import 'modules/game/components/GameItemControl.less';
import {GameRevealButton} from 'modules/game/components/GameRevealButton';
import {GameVoteButton} from 'modules/game/components/GameVoteButton';
import {TGame} from 'modules/game/types';
import {UNVOTED_OPTION} from 'modules/task/constants';
import {TTask} from 'modules/task/types';
import React, {Fragment} from 'react';

type Props = {
  game: TGame;
  taskData?: TTask;
  taskId: string;
  userId: string;
};

export const GameItemControl = ({game, taskData, taskId, userId}: Props) => {
  if (taskData === undefined) {
    return null;
  }

  return (
    <div className="GameItemControl box">
      <div className="GameItemControl__Group GameItemControl__Group_Vote">
        {game.optionList.map((option) => (
          <Fragment key={option}>
            <GameVoteButton isVoted={taskData.isVoted} key={option} option={option} taskId={taskId} userId={userId} />{' '}
          </Fragment>
        ))}
        <GameVoteButton isVoted={taskData.isVoted} option={UNVOTED_OPTION} taskId={taskId} userId={userId} />
      </div>
      {game.creatorId === userId && (
        <div className="GameItemControl__Group GameItemControl__Group_Reveal">
          <GameRevealButton isVoted={taskData.isVoted} taskId={taskId} votes={taskData.votes} />
        </div>
      )}
    </div>
  );
};
