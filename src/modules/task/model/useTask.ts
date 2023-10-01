import {DocumentSnapshot, onSnapshot} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {useEffect, useState} from 'react';

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<DocumentSnapshot>();
  const taskDocRef = useDocRef('task', taskId);

  useEffect(() => onSnapshot(taskDocRef, setTask), [taskDocRef]);

  return task;
};
