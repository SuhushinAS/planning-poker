import { Auth, getAuth } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useFirebaseAppContext } from 'src/modules/firebase/ui/FirebaseApp';

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<Auth | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
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
