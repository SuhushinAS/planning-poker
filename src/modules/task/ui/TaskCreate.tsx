import { addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { DefaultValues, SubmitHandler } from 'react-hook-form';
import { useCollectionRef } from 'src/modules/firebase/lib/useCollectionRef';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';
import { TTask } from 'src/modules/task/lib/types';
import { TaskForm } from 'src/modules/task/ui/TaskForm';

type Props = {
  creatorId: string;
  gameId: string;
};

export const TaskCreate = ({ creatorId, gameId }: Props) => {
  const defaultValues = useMemo<DefaultValues<TTask>>(() => {
    return {
      createDate: serverTimestamp(),
      creatorId,
      gameId,
      isVoted: false,
      title: '',
      votes: {},
    };
  }, [creatorId, gameId]);
  const taskCollectionRef = useCollectionRef('task');
  const gameDocRef = useDocRef('game', gameId);

  const onSubmit = useCallback<SubmitHandler<TTask>>(
    (values) => {
      return addDoc(taskCollectionRef, values).then((value) => {
        return updateDoc(gameDocRef, { taskId: value.id });
      });
    },
    [gameDocRef, taskCollectionRef],
  );

  return <TaskForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};
