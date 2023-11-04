import {DocumentReference} from '@firebase/firestore';
import {addDoc, serverTimestamp, updateDoc} from 'firebase/firestore';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {TaskForm} from 'modules/task/components/TaskForm';
import {TTask} from 'modules/task/types';
import React, {useCallback, useMemo} from 'react';

type Props = {
  creatorId: string;
  gameId: string;
};

export const TaskCreate = ({creatorId, gameId}: Props) => {
  const defaultValues = useMemo<TTask>(() => {
    return {
      creatorId,
      gameId,
      isVoted: false,
      title: '',
      votes: {},
    };
  }, [creatorId, gameId]);
  const taskCollectionRef = useCollectionRef('task');
  const gameDocRef = useDocRef('game', gameId);

  const onSuccess = useCallback((value: DocumentReference) => updateDoc(gameDocRef, {taskId: value.id}), [gameDocRef]);

  const onSubmit = useCallback(
    (values) =>
      addDoc(taskCollectionRef, {
        ...values,
        createDate: serverTimestamp(),
      }).then(onSuccess),
    [onSuccess, taskCollectionRef]
  );

  return <TaskForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};
