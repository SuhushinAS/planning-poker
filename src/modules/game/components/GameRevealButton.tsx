import {updateDoc} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Button} from 'modules/form/components/Button';
import {Message} from 'modules/locale/components/Message';
import {UNVOTED_OPTION} from 'modules/task/constants';
import React, {useCallback, useMemo} from 'react';

type Props = {
  isVoted: boolean;
  taskId: string;
  votes: Record<string, number>;
};

export const GameRevealButton = ({isVoted, taskId, votes}: Props) => {
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
      <Message id={messageId} />
    </Button>
  );
};
