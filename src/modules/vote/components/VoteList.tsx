import {TGame} from 'modules/game/types';
import {optionTitleMap, OptionType} from 'modules/option/constants';
import {useOptionSetList} from 'modules/option/model/useOptionSet';
import {TTask} from 'modules/task/types';
import {VoteButton} from 'modules/vote/components/VoteButton';
import React, {useMemo} from 'react';
import '../../task/components/TaskControl.less';

type Props = {
  game: TGame;
  taskData: TTask;
  taskId: string;
  userId: string;
};

export const VoteList = ({game, taskData, taskId, userId}: Props) => {
  const optionSetList = useOptionSetList();

  const optionList = useMemo(() => {
    if (game.optionSetId === undefined) {
      return optionSetList[0]?.optionList;
    }

    const optionSetMap = Object.fromEntries(optionSetList.map((optionSet) => [optionSet.id, optionSet]));

    return optionSetMap[game.optionSetId]?.optionList;
  }, [game.optionSetId, optionSetList]);

  return (
    <div className="TaskControl__Row">
      {optionList?.map((option) => (
        <div className="TaskControl__Item" key={option}>
          <VoteButton isVoted={taskData.isVoted} key={option} option={option} taskId={taskId} userId={userId} vote={taskData.votes[userId]} />
        </div>
      ))}
      <div className="TaskControl__Item">
        <VoteButton isVoted={taskData.isVoted} option={OptionType.unsure} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
          {optionTitleMap[OptionType.unsure]}
        </VoteButton>
      </div>
      <div className="TaskControl__Item">
        <VoteButton isVoted={taskData.isVoted} option={OptionType.coffee} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
          {optionTitleMap[OptionType.coffee]}
        </VoteButton>
      </div>
      <div className="TaskControl__Item">
        <VoteButton isVoted={taskData.isVoted} option={OptionType.reset} taskId={taskId} userId={userId} vote={taskData.votes[userId]}>
          {optionTitleMap[OptionType.reset]}
        </VoteButton>
      </div>
    </div>
  );
};
