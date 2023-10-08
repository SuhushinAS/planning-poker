import {addDoc} from 'firebase/firestore';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
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

  const onSubmit = useCallback((values) => addDoc(taskCollectionRef, values), [taskCollectionRef]);

  return <TaskForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};
