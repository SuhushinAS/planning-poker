import {Firestore, getFirestore} from 'firebase/firestore';
import {useFirebaseAppContext} from 'modules/firebase/components/FirebaseApp';
import React, {ReactNode, createContext, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const FirebaseFirestoreContext = createContext<Firestore | undefined>(undefined);

export const FirebaseFirestoreProvider = ({children}: Props) => {
  const firebaseApp = useFirebaseAppContext();
  const [firebaseFirestore, setFirebaseFirestore] = useState<Firestore>();

  useEffect(() => {
    setFirebaseFirestore(getFirestore(firebaseApp));
  }, [firebaseApp]);

  if (firebaseFirestore === undefined) {
    return null;
  }

  return <FirebaseFirestoreContext.Provider value={firebaseFirestore}>{children}</FirebaseFirestoreContext.Provider>;
};

export const useFirebaseFirestoreContext = () => {
  const firebaseFirestore = useContext(FirebaseFirestoreContext);

  if (firebaseFirestore === undefined) {
    throw new Error('useFirebaseFirestoreContext can only be used in a FirebaseFirestoreProvider');
  }

  return firebaseFirestore;
};
