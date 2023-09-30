import {User, signInAnonymously} from 'firebase/auth';
import {useFirebaseAuthContext} from 'modules/firebase/components/FirebaseAuth';
import React, {ReactNode, createContext, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const FirebaseAnonymContext = createContext<User | undefined>(undefined);

export const FirebaseAnonymProvider = ({children}: Props) => {
  const firebaseAuth = useFirebaseAuthContext();
  const [firebaseAnonym, setFirebaseAnonym] = useState<User>();

  useEffect(() => {
    signInAnonymously(firebaseAuth).then(({user}) => setFirebaseAnonym(user));
  }, [firebaseAuth]);

  if (firebaseAnonym === undefined) {
    return null;
  }

  return <FirebaseAnonymContext.Provider value={firebaseAnonym}>{children}</FirebaseAnonymContext.Provider>;
};

export const useFirebaseAnonymContext = () => {
  const firebaseAnonym = useContext(FirebaseAnonymContext);

  if (firebaseAnonym === undefined) {
    throw new Error('useFirebaseAnonymContext can only be used in a FirebaseAnonymProvider');
  }

  return firebaseAnonym;
};
