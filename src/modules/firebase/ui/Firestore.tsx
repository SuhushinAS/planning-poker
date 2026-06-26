import { Firestore, getFirestore } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useFirebaseAppContext } from 'src/modules/firebase/ui/FirebaseApp';

type Props = {
  children: ReactNode;
};

const FirestoreContext = createContext<Firestore | undefined>(undefined);

export const FirestoreProvider = ({ children }: Props) => {
  const firebaseApp = useFirebaseAppContext();
  const [firestore, setFirestore] = useState<Firestore>();

  useEffect(() => {
    setFirestore(getFirestore(firebaseApp));

    return () => setFirestore(undefined);
  }, [firebaseApp]);

  if (firestore === undefined) {
    return null;
  }

  return <FirestoreContext.Provider value={firestore}>{children}</FirestoreContext.Provider>;
};

export const useFirestoreContext = () => {
  const firestore = useContext(FirestoreContext);

  if (firestore === undefined) {
    throw new Error('useFirestoreContext can only be used in a FirestoreProvider');
  }

  return firestore;
};
