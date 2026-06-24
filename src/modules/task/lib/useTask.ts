import { DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<DocumentSnapshot>();
  const taskDocRef = useDocRef('task', taskId);

  useEffect(() => onSnapshot(taskDocRef, setTask), [taskDocRef]);

  return task;
};
