import {Table} from 'modules/common/components/Table';
import {GameMember} from 'modules/game/components/GameMember';
import {TGame} from 'modules/game/types';
import {TTask} from 'modules/task/types';
import React, {useCallback, useMemo} from 'react';

type Props = {
  game: TGame;
  taskData: TTask;
  title: string;
  userId: string;
};

export const GameMemberList = ({game, taskData, title, userId}: Props) => {
  const memberIdList = useMemo(() => Object.keys(game.memberIds), [game.memberIds]);

  const renderMember = useCallback(
    (memberId) => (
      <GameMember
        isCreator={game.creatorId === memberId}
        isSelf={userId === memberId}
        isVoted={taskData.isVoted}
        key={memberId}
        memberId={memberId}
        votes={taskData.votes}
      />
    ),
    [game.creatorId, taskData.isVoted, taskData.votes, userId]
  );

  return <Table title={<h4>{title}</h4>}>{memberIdList.map(renderMember)}</Table>;
};
