import {Auth, getAuth} from 'firebase/auth';
import {useFirebaseAppContext} from 'modules/firebase/components/FirebaseApp';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<Auth | undefined>(undefined);

export const AuthProvider = (props: Props) => {
  const {children} = props;
  const firebaseApp = useFirebaseAppContext();
  const [auth, setAuth] = useState<Auth>();

  useEffect(() => {
    setAuth(getAuth(firebaseApp));
  }, [firebaseApp]);

  if (auth === undefined) {
    return null;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const firebaseAuth = useContext(AuthContext);

  if (firebaseAuth === undefined) {
    throw new Error('useAuthContext can only be used in a AuthProvider');
  }

  return firebaseAuth;
};
