import { onSnapshot, QuerySnapshot, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useCollectionRef } from 'src/modules/firebase/lib/useCollectionRef';
import { useQueryConstraint } from 'src/modules/firebase/lib/useQueryConstraint';
import { TTask } from 'src/modules/task/lib/types';

export const useTaskList = (gameId: string) => {
  const [taskList, setTaskList] = useState<QuerySnapshot<TTask>>();
  const queryConstraint = useMemo(() => where('gameId', '==', gameId), [gameId]);
  const q = useQueryConstraint<TTask, TTask>(useCollectionRef('task'), queryConstraint);

  useEffect(() => onSnapshot(q, setTaskList), [q]);

  return taskList;
};
