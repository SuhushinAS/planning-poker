import {DocumentSnapshot} from 'firebase/firestore';
import 'modules/game/components/GameItemControl.less';
import {GameRevealButton} from 'modules/game/components/GameRevealButton';
import {GameVoteButton} from 'modules/game/components/GameVoteButton';
import {TGame} from 'modules/game/types';
import {UNVOTED_OPTION} from 'modules/task/constants';
import {TTask} from 'modules/task/types';
import React, {Fragment} from 'react';

type Props = {
  game: TGame;
  taskData: TTask;
  userSelf: DocumentSnapshot;
};

export const GameItemControl = ({game, taskData, userSelf}: Props) => (
  <div className="GameItemControl box">
    <div className="GameItemControl__Group GameItemControl__Group_Vote">
      {game.optionList.map((option) => (
        <Fragment key={option}>
          <GameVoteButton
            isVoted={taskData.isVoted}
            key={option}
            option={option}
            taskId={game.taskId}
            userId={userSelf.id}
          />{' '}
        </Fragment>
      ))}
      <GameVoteButton isVoted={taskData.isVoted} option={UNVOTED_OPTION} taskId={game.taskId} userId={userSelf.id} />
    </div>
    {game.creatorId === userSelf.id && (
      <div className="GameItemControl__Group GameItemControl__Group_Reveal">
        <GameRevealButton isVoted={taskData.isVoted} taskId={game.taskId} votes={taskData.votes} />
      </div>
    )}
  </div>
);
