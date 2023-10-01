import {updateDoc} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Button} from 'modules/form/components/Button';
import {GameMember} from 'modules/game/components/GameMember';
import {TGame} from 'modules/game/types';
import {Message} from 'modules/locale/components/Message';
import {UNVOTED_OPTION} from 'modules/task/constants';
import {useTask} from 'modules/task/model/useTask';
import {TTask} from 'modules/task/types';
import {useUserSelf} from 'modules/user/model/useUserSelf';
import React, {Fragment, useCallback, useMemo} from 'react';

type OptionButtonProps = {
  option: number;
  taskId: string;
  userId: string;
};

export const VoteButton = ({option, taskId, userId}: OptionButtonProps) => {
  const taskDocRef = useDocRef('task', taskId);

  const onVote = useCallback(() => {
    updateDoc(taskDocRef, {[`votes.${userId}`]: option});
  }, [option, taskDocRef, userId]);

  return (
    <Button onClick={onVote} type="button">
      <h4>{option === UNVOTED_OPTION ? '\u00A0' : option}</h4>
    </Button>
  );
};

type RevealButtonProps = {
  isVoted: boolean;
  taskId: string;
  votes: Record<string, number>;
};

export const RevealButton = ({isVoted, taskId, votes}: RevealButtonProps) => {
  const taskDocRef = useDocRef('task', taskId);
  const hasVote = useMemo(() => Object.values(votes).some((vote) => vote !== UNVOTED_OPTION), [votes]);
  const messageId = useMemo(() => (isVoted ? 'game.reset' : 'game.reveal'), [isVoted]);

  const onReveal = useCallback(() => {
    if (isVoted) {
      return updateDoc(taskDocRef, {
        isVoted: false,
        votes: {},
      });
    }

    return updateDoc(taskDocRef, {isVoted: true});
  }, [isVoted, taskDocRef]);

  return (
    <Button disabled={!hasVote} onClick={onReveal} type="button">
      <h4>
        <Message id={messageId} />
      </h4>
    </Button>
  );
};

type TaskProps = {
  game: TGame;
  gameId: string;
};

export const Task = ({game, gameId}: TaskProps) => {
  const task = useTask(game.taskId);
  const userSelf = useUserSelf();

  if (userSelf === undefined || task === undefined || !task.exists()) {
    return null;
  }

  const taskData = task.data() as TTask;

  return (
    <div>
      <div>
        {game.optionList.map((option) => (
          <Fragment key={option}>
            <VoteButton option={option} taskId={game.taskId} userId={userSelf.id} />{' '}
          </Fragment>
        ))}
        <VoteButton option={UNVOTED_OPTION} taskId={game.taskId} userId={userSelf.id} />
      </div>
      <div>
        <table>
          <tbody>
            {Object.keys(game.memberIds).map((memberId) => (
              <GameMember
                gameId={gameId}
                isCreator={game.creatorId === memberId}
                isSelf={userSelf.id === memberId}
                isVoted={taskData.isVoted}
                key={memberId}
                memberId={memberId}
                selfId={userSelf.id}
                votes={taskData.votes}
              />
            ))}
          </tbody>
        </table>
      </div>
      {game.creatorId === userSelf.id && (
        <div>
          <RevealButton isVoted={taskData.isVoted} taskId={game.taskId} votes={taskData.votes} />
        </div>
      )}
    </div>
  );
};
