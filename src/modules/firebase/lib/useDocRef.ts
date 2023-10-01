import {doc} from 'firebase/firestore';
import {useFirestoreContext} from 'modules/firebase/components/Firestore';
import {useRef} from 'react';

export const useDocRef = (path: string, ...pathSegments: string[]) => {
  const firestore = useFirestoreContext();
  const docRef = useRef(doc(firestore, path, ...pathSegments));

  return docRef.current;
};
