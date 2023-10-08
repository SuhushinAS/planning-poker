import {GameMember} from 'modules/game/components/GameMember';
import 'modules/game/components/GameMemberList.less';
import {TGame} from 'modules/game/types';
import {TTask} from 'modules/task/types';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
  taskData: TTask;
  title: string;
  userId: string;
};

export const GameMemberList = ({game, gameId, taskData, title, userId}: Props) => (
  <table className="GameMemberList">
    <caption className="GameMemberList__Title">
      <h5>{title}</h5>
    </caption>
    <tbody>
      {Object.keys(game.memberIds).map((memberId) => (
        <GameMember
          gameId={gameId}
          isCreator={game.creatorId === memberId}
          isSelf={userId === memberId}
          isVoted={taskData.isVoted}
          key={memberId}
          memberId={memberId}
          votes={taskData.votes}
        />
      ))}
    </tbody>
  </table>
);
