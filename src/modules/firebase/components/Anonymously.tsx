import {signInAnonymously, User} from 'firebase/auth';
import {useAuthContext} from 'modules/firebase/components/Auth';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const AnonymouslyContext = createContext<User | undefined>(undefined);

export const AnonymouslyProvider = (props: Props) => {
  const {children} = props;
  const auth = useAuthContext();
  const [anonymously, setAnonymously] = useState<User>();

  useEffect(() => {
    signInAnonymously(auth).then(({user}) => setAnonymously(user));
  }, [auth]);

  if (anonymously === undefined) {
    return null;
  }

  return <AnonymouslyContext.Provider value={anonymously}>{children}</AnonymouslyContext.Provider>;
};

export const useAnonymouslyContext = () => {
  const anonymously = useContext(AnonymouslyContext);

  if (anonymously === undefined) {
    throw new Error('useAnonymouslyContext can only be used in a AnonymouslyProvider');
  }

  return anonymously;
};
