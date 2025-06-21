import {CollectionReference, DocumentData} from '@firebase/firestore';
import {collection} from 'firebase/firestore';
import {useFirestoreContext} from 'modules/firebase/components/Firestore';
import {useMemo} from 'react';

export const useCollectionRef = <T1 extends DocumentData = DocumentData, T2 extends DocumentData = DocumentData>(path: string) => {
  const firestore = useFirestoreContext();

  return useMemo(() => {
    return collection(firestore, path) as CollectionReference<T1, T2>;
  }, [firestore, path]);
};
