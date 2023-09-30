import {Auth, getAuth} from 'firebase/auth';
import {useFirebaseAppContext} from 'modules/firebase/components/FirebaseApp';
import React, {ReactNode, createContext, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const FirebaseAuthContext = createContext<Auth | undefined>(undefined);

export const FirebaseAuthProvider = ({children}: Props) => {
  const firebaseApp = useFirebaseAppContext();
  const [firebaseAuth, setFirebaseAuth] = useState<Auth>();

  useEffect(() => {
    setFirebaseAuth(getAuth(firebaseApp));
  }, [firebaseApp]);

  if (firebaseAuth === undefined) {
    return null;
  }

  return <FirebaseAuthContext.Provider value={firebaseAuth}>{children}</FirebaseAuthContext.Provider>;
};

export const useFirebaseAuthContext = () => {
  const firebaseAuth = useContext(FirebaseAuthContext);

  if (firebaseAuth === undefined) {
    throw new Error('useFirebaseAuthContext can only be used in a FirebaseAuthProvider');
  }

  return firebaseAuth;
};
