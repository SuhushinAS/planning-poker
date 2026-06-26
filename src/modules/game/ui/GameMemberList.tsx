import { useCallback, useMemo } from 'react';
import { Table } from 'src/modules/common/ui/Table';
import { TGame } from 'src/modules/game/lib/types';
import { GameMember } from 'src/modules/game/ui/GameMember';
import { TTask } from 'src/modules/task/lib/types';

type Props = {
  game: TGame;
  gameId: string;
  taskData: TTask;
  title: string;
  userId: string;
};

export const GameMemberList = ({ game, gameId, taskData, title, userId }: Props) => {
  const memberIdList = useMemo(() => {
    return Object.keys(game.memberIds).toSorted();
  }, [game.memberIds]);

  const renderMember = useCallback(
    (memberId: string) => (
      <GameMember
        gameId={gameId}
        isCreator={game.creatorId === memberId}
        isSelf={userId === memberId}
        isVoted={taskData.isVoted}
        key={memberId}
        memberId={memberId}
        votes={taskData.votes}
      />
    ),
    [game.creatorId, gameId, taskData.isVoted, taskData.votes, userId],
  );

  return <Table title={<h4>{title}</h4>}>{memberIdList.map(renderMember)}</Table>;
};
