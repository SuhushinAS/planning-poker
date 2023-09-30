import {Database, getDatabase} from 'firebase/database';
import {useFirebaseAppContext} from 'modules/firebase/components/FirebaseApp';
import React, {ReactNode, createContext, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const FirebaseDatabaseContext = createContext<Database | undefined>(undefined);

export const FirebaseDatabaseProvider = ({children}: Props) => {
  const firebaseApp = useFirebaseAppContext();
  const [firebaseDatabase, setFirebaseDatabase] = useState<Database>();

  useEffect(() => {
    setFirebaseDatabase(getDatabase(firebaseApp));
  }, [firebaseApp]);

  if (firebaseDatabase === undefined) {
    return null;
  }

  return <FirebaseDatabaseContext.Provider value={firebaseDatabase}>{children}</FirebaseDatabaseContext.Provider>;
};

export const useFirebaseDatabaseContext = () => {
  const firebaseDatabase = useContext(FirebaseDatabaseContext);

  if (firebaseDatabase === undefined) {
    throw new Error('useFirebaseDatabaseContext can only be used in a FirebaseDatabaseProvider');
  }

  return firebaseDatabase;
};
