import {collection} from 'firebase/firestore';
import {useFirestoreContext} from 'modules/firebase/components/Firestore';
import {useRef} from 'react';

export const useCollectionRef = (path: string, ...pathSegments: string[]) => {
  const firestore = useFirestoreContext();
  const collectionRef = useRef(collection(firestore, path, ...pathSegments));

  return collectionRef.current;
};
