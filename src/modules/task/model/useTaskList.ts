import {onSnapshot, QuerySnapshot, where} from 'firebase/firestore';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
import {useQueryConstraint} from 'modules/firebase/lib/useQueryConstraint';
import {TTask} from 'modules/task/types';
import {useEffect, useMemo, useState} from 'react';

export const useTaskList = (gameId: string) => {
  const [taskList, setTaskList] = useState<QuerySnapshot<TTask>>();
  const queryConstraint = useMemo(() => where('gameId', '==', gameId), [gameId]);
  const q = useQueryConstraint<TTask, TTask>(useCollectionRef('task'), queryConstraint);

  useEffect(() => onSnapshot(q, setTaskList), [q]);

  return taskList;
};
