import {Table} from 'modules/common/components/Table';
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

export const GameItemControl = (props: Props) => {
  const {game, taskData, taskId, userId} = props;

  if (taskData === undefined) {
    return null;
  }

  return (
    <Table>
      <tr>
        {game.optionList.map((option) => (
          <td className="Table__Cell Table__Cell_Title Table__Cell_Control" key={option}>
            <GameVoteButton isVoted={taskData.isVoted} key={option} option={option} taskId={taskId} userId={userId} vote={taskData.votes[userId]} />
          </td>
        ))}
        <td className="Table__Cell Table__Cell_Title Table__Cell_Control">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.unsure} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.unsure]}
          </GameVoteButton>
        </td>
        <td className="Table__Cell Table__Cell_Title Table__Cell_Control">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.coffee} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.coffee]}
          </GameVoteButton>
        </td>
        <td className="Table__Cell Table__Cell_Title Table__Cell_Control">
          <GameVoteButton isVoted={taskData.isVoted} option={OptionType.reset} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
            {optionTitleMap[OptionType.reset]}
          </GameVoteButton>
        </td>
      </tr>
      {game.creatorId === userId && (
        <tr>
          <td className="Table__Cell" colSpan={game.optionList.length + 3}>
            <GameRevealButton isVoted={taskData.isVoted} taskId={taskId} votes={taskData.votes} />
          </td>
        </tr>
      )}
    </Table>
  );
};
