import {addDoc, serverTimestamp, updateDoc} from 'firebase/firestore';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {TaskForm} from 'modules/task/components/TaskForm';
import {TTask} from 'modules/task/types';
import React, {useCallback, useMemo} from 'react';
import {DefaultValues, SubmitHandler} from 'react-hook-form';

type Props = {
  creatorId: string;
  gameId: string;
};

export const TaskCreate = ({creatorId, gameId}: Props) => {
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
        return updateDoc(gameDocRef, {taskId: value.id});
      });
    },
    [gameDocRef, taskCollectionRef]
  );

  return <TaskForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};
