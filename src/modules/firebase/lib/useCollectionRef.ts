import {collection} from 'firebase/firestore';
import {useFirestoreContext} from 'modules/firebase/components/Firestore';
import {useMemo} from 'react';

export const useCollectionRef = (path: string) => {
  const firestore = useFirestoreContext();

  return useMemo(() => collection(firestore, path), [firestore, path]);
};
