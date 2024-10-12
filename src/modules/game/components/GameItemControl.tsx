import {GameRevealButton} from 'modules/game/components/GameRevealButton';
import {GameVoteButton} from 'modules/game/components/GameVoteButton';
import {TGame} from 'modules/game/types';
import {optionTitleMap, OptionType} from 'modules/option/constants';
import {TTask} from 'modules/task/types';
import React from 'react';
import './GameItemControl.less';

type Props = {
  game: TGame;
  taskData?: TTask;
  taskId: string;
  userId: string;
};

export const GameItemControl = (props: Props) => {
  const {game, taskData, taskId, userId} = props;

  if (taskData === undefined) {
    return null;
  }

  return (
    <div className="GameItemControl">
      <div className="GameItemControl__Row">
        {game.optionList.map((option) => (
          <div className="GameItemControl__Item" key={option}>
            <GameVoteButton isVoted={taskData.isVoted} key={option} option={option} taskId={taskId} userId={userId} vote={taskData.votes[userId]} />
          </div>
        ))}
        <div className="GameItemControl__Item">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.unsure} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.unsure]}
          </GameVoteButton>
        </div>
        <div className="GameItemControl__Item">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.coffee} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.coffee]}
          </GameVoteButton>
        </div>
        <div className="GameItemControl__Item">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.reset} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.reset]}
          </GameVoteButton>
        </div>
      </div>
      {game.creatorId === userId && (
        <div className="GameItemControl__Row">
          <div className="GameItemControl__Item">
            <GameRevealButton isVoted={taskData.isVoted} taskId={taskId} votes={taskData.votes} />
          </div>
        </div>
      )}
    </div>
  );
};
