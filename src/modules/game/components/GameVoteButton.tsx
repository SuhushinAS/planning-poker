import {updateDoc} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Button} from 'modules/form/components/Button';
import {UNVOTED_OPTION} from 'modules/task/constants';
import React, {useCallback} from 'react';

type Props = {
  isVoted: boolean;
  option: number;
  taskId: string;
  userId: string;
  vote: number;
};

export const GameVoteButton = ({isVoted, option, taskId, userId, vote}: Props) => {
  const taskDocRef = useDocRef('task', taskId);

  const onVote = useCallback(() => {
    updateDoc(taskDocRef, {[`votes.${userId}`]: option});
  }, [option, taskDocRef, userId]);

  return (
    <Button className="Button_Primary" disabled={isVoted || vote === option} onClick={onVote} type="button">
      {option === UNVOTED_OPTION ? '\u00A0' : option}
    </Button>
  );
};
