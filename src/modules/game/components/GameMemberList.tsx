import {DocumentSnapshot} from 'firebase/firestore';
import {GameMember} from 'modules/game/components/GameMember';
import 'modules/game/components/GameMemberList.less';
import {TGame} from 'modules/game/types';
import {TTask} from 'modules/task/types';
import React from 'react';

type Props = {
  game: TGame;
  gameId: string;
  taskData: TTask;
  userSelf: DocumentSnapshot;
};

export const GameMemberList = ({game, gameId, taskData, userSelf}: Props) => (
  <div className="GameMemberList">
    <table className="GameMemberList__Table">
      <tbody>
        {Object.keys(game.memberIds).map((memberId) => (
          <GameMember
            gameId={gameId}
            isCreator={game.creatorId === memberId}
            isSelf={userSelf.id === memberId}
            isVoted={taskData.isVoted}
            key={memberId}
            memberId={memberId}
            votes={taskData.votes}
          />
        ))}
      </tbody>
    </table>
  </div>
);
