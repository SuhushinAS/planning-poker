import { updateDoc } from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';
import { Button } from 'src/modules/form/ui/Button';
import { Message } from 'src/modules/locale/ui/Message';
import { Option } from 'src/modules/option/lib/types';

type Props = {
  isVoted: boolean;
  taskId: string;
  votes: Record<string, number>;
};

export const GameRevealButton = ({ isVoted, taskId, votes }: Props) => {
  const taskDocRef = useDocRef('task', taskId);

  const hasVote = useMemo(
    () => Object.values(votes).some((vote) => vote !== Option.reset),
    [votes],
  );

  const messageId = useMemo(() => (isVoted ? 'game.reset' : 'game.reveal'), [isVoted]);

  const onReveal = useCallback(() => {
    if (isVoted) {
      return updateDoc(taskDocRef, {
        isVoted: false,
        votes: {},
      });
    }

    return updateDoc(taskDocRef, { isVoted: true });
  }, [isVoted, taskDocRef]);

  return (
    <Button className="Button_Primary offset" disabled={!hasVote} onClick={onReveal} type="button">
      <Message id={messageId} />
    </Button>
  );
};
