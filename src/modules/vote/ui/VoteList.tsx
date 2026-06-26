import { useMemo } from 'react';
import { TGame } from 'src/modules/game/lib/types';
import { optionTitleMap } from 'src/modules/option/lib/constants';
import { Option } from 'src/modules/option/lib/types';
import { useOptionSetList } from 'src/modules/option/lib/useOptionSet';
import { TTask } from 'src/modules/task/lib/types';
import { VoteButton } from 'src/modules/vote/ui/VoteButton';
import 'src/modules/task/ui/TaskControl.less';

type Props = {
  game: TGame;
  taskData: TTask;
  taskId: string;
  userId: string;
};

export const VoteList = ({ game, taskData, taskId, userId }: Props) => {
  const optionSetList = useOptionSetList();

  const optionList = useMemo(() => {
    if (game.optionSetId === undefined) {
      return optionSetList[0]?.optionList;
    }

    const optionSetMap = Object.fromEntries(
      optionSetList.map((optionSet) => [optionSet.id, optionSet]),
    );

    return optionSetMap[game.optionSetId]?.optionList;
  }, [game.optionSetId, optionSetList]);

  return (
    <div className="TaskControl__Row">
      {optionList?.map((option) => (
        <div className="TaskControl__Item" key={option}>
          <VoteButton
            isVoted={taskData.isVoted}
            key={option}
            option={option}
            taskId={taskId}
            userId={userId}
            vote={taskData.votes[userId]}
          />
        </div>
      ))}
      <div className="TaskControl__Item">
        <VoteButton
          isVoted={taskData.isVoted}
          option={Option.unsure}
          taskId={taskId}
          userId={userId}
          vote={taskData.votes[userId]}
        >
          {optionTitleMap[Option.unsure]}
        </VoteButton>
      </div>
      <div className="TaskControl__Item">
        <VoteButton
          isVoted={taskData.isVoted}
          option={Option.coffee}
          taskId={taskId}
          userId={userId}
          vote={taskData.votes[userId]}
        >
          {optionTitleMap[Option.coffee]}
        </VoteButton>
      </div>
      <div className="TaskControl__Item">
        <VoteButton
          isVoted={taskData.isVoted}
          option={Option.reset}
          taskId={taskId}
          userId={userId}
          vote={taskData.votes[userId]}
        >
          {optionTitleMap[Option.reset]}
        </VoteButton>
      </div>
    </div>
  );
};
