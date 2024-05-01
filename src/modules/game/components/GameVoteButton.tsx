import {updateDoc} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Button} from 'modules/form/components/Button';
import React, {ReactNode, useCallback} from 'react';

type Props = {
  children?: ReactNode;
  isVoted: boolean;
  option: number;
  taskId: string;
  userId: string;
  vote: number;
};

export const GameVoteButton = ({children, isVoted, option, taskId, userId, vote}: Props) => {
  const taskDocRef = useDocRef('task', taskId);

  const onVote = useCallback(() => {
    updateDoc(taskDocRef, {[`votes.${userId}`]: option});
  }, [option, taskDocRef, userId]);

  return (
    <Button className="Button_Primary offset_ver" disabled={isVoted || vote === option} onClick={onVote} type="button">
      {children ?? option}
    </Button>
  );
};
