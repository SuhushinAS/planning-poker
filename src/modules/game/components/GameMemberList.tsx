import {Table} from 'modules/common/components/Table';
import {GameMember} from 'modules/game/components/GameMember';
import {TGame} from 'modules/game/types';
import {TTask} from 'modules/task/types';
import React from 'react';

type Props = {
  game: TGame;
  taskData: TTask;
  title: string;
  userId: string;
};

export const GameMemberList = ({game, taskData, title, userId}: Props) => (
  <Table title={<h5>{title}</h5>}>
    {Object.keys(game.memberIds).map((memberId) => (
      <GameMember
        isCreator={game.creatorId === memberId}
        isSelf={userId === memberId}
        isVoted={taskData.isVoted}
        key={memberId}
        memberId={memberId}
        votes={taskData.votes}
      />
    ))}
  </Table>
);
