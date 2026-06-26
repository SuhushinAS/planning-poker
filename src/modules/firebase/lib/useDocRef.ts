import { doc } from 'firebase/firestore';
import { useMemo } from 'react';
import { useFirestoreContext } from 'src/modules/firebase/ui/Firestore';

export const useDocRef = (path: string, pathSegment: string) => {
  const firestore = useFirestoreContext();

  return useMemo(() => doc(firestore, path, pathSegment), [firestore, path, pathSegment]);
};
