import {doc} from 'firebase/firestore';
import {useFirestoreContext} from 'modules/firebase/components/Firestore';
import {useMemo} from 'react';

export const useDocRef = (path: string, ...pathSegments: string[]) => {
  const firestore = useFirestoreContext();

  return useMemo(() => doc(firestore, path, ...pathSegments), [firestore, path, pathSegments]);
};
