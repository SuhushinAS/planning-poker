import { signInAnonymously, User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAuthContext } from 'src/modules/firebase/ui/Auth';

type Props = {
  children: ReactNode;
};

const AnonymouslyContext = createContext<User | undefined>(undefined);

export const AnonymouslyProvider = ({ children }: Props) => {
  const auth = useAuthContext();
  const [anonymously, setAnonymously] = useState<User>();

  useEffect(() => {
    signInAnonymously(auth).then(({ user }) => setAnonymously(user));
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
