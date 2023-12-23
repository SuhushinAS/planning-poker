import {Table} from 'modules/common/components/Table';
import 'modules/game/components/GameItemControl.less';
import {GameRevealButton} from 'modules/game/components/GameRevealButton';
import {GameVoteButton} from 'modules/game/components/GameVoteButton';
import {TGame} from 'modules/game/types';
import {optionTitleMap, OptionType} from 'modules/option/constants';
import {TTask} from 'modules/task/types';
import React from 'react';

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
    <Table>
      <tr>
        {game.optionList.map((option) => (
          <td className="GameItemControl__Cell GameItemControl__Cell_Vote" key={option}>
            <GameVoteButton isVoted={taskData.isVoted} key={option} option={option} taskId={taskId} userId={userId} vote={taskData.votes[userId]} />
          </td>
        ))}
        <td className="GameItemControl__Cell GameItemControl__Cell_Vote">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.unsure} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.unsure]}
          </GameVoteButton>
        </td>
        <td className="GameItemControl__Cell GameItemControl__Cell_Vote">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.coffee} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.coffee]}
          </GameVoteButton>
        </td>
        <td className="GameItemControl__Cell GameItemControl__Cell_Vote">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.reset} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.reset]}
          </GameVoteButton>
        </td>
      </tr>
      {game.creatorId === userId && (
        <tr>
          <td className="GameItemControl__Cell GameItemControl__Cell_Reveal" colSpan={game.optionList.length + 3}>
            <GameRevealButton isVoted={taskData.isVoted} taskId={taskId} votes={taskData.votes} />
          </td>
        </tr>
      )}
    </Table>
  );
};
