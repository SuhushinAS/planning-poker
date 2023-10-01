import {updateDoc} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Button} from 'modules/form/components/Button';
import {GameMember} from 'modules/game/components/GameMember';
import {TGame} from 'modules/game/types';
import {UNVOTED_OPTION} from 'modules/task/constants';
import {useTask} from 'modules/task/model/useTask';
import {TTask} from 'modules/task/types';
import {useUserSelf} from 'modules/user/model/useUserSelf';
import React, {useCallback} from 'react';

type OptionButtonProps = {
  option: number;
  taskId: string;
  userId: string;
};

export const OptionButton = ({option, taskId, userId}: OptionButtonProps) => {
  const taskDocRef = useDocRef('task', taskId);

  const onVote = useCallback(() => {
    updateDoc(taskDocRef, {[`votes.${userId}`]: option});
  }, [option, taskDocRef, userId]);

  return (
    <Button onClick={onVote} type="button">
      {option ?? '\u00A0'}
    </Button>
  );
};

type TaskProps = {
  game: TGame;
};

export const Task = ({game}: TaskProps) => {
  const task = useTask(game.taskId);
  const userSelf = useUserSelf();

  if (userSelf === undefined || task === undefined || !task.exists()) {
    return null;
  }

  const taskData = task.data() as TTask;

  return (
    <div>
      <div>
        <table>
          <tbody>
            {Object.keys(game.memberIds).map((memberId) => (
              <GameMember
                isCreator={game.creatorId === memberId}
                isSelf={userSelf.id === memberId}
                key={memberId}
                memberId={memberId}
                selfId={userSelf.id}
                votes={taskData.votes}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {game.optionList.map((option) => (
          <>
            <OptionButton key={option} option={option} taskId={game.taskId} userId={userSelf.id} />{' '}
          </>
        ))}
        <OptionButton option={UNVOTED_OPTION} taskId={game.taskId} userId={userSelf.id} />
      </div>
    </div>
  );
};
