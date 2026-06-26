import { signInAnonymously, User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { EmptyKey } from 'src/modules/common/ui/EmptyKey';
import { useAuthContext } from 'src/modules/firebase/ui/Auth';

type Props = {
  children: ReactNode;
};

const AnonymouslyContext = createContext<User | undefined>(undefined);

export const AnonymouslyProvider = ({ children }: Props) => {
  const auth = useAuthContext();
  const [anonymously, setAnonymously] = useState<User>();
  const [error, setError] = useState(false);

  useEffect(() => {
    signInAnonymously(auth)
      .then(({ user }) => setAnonymously(user))
      .catch(() => setError(true));
  }, [auth]);

  if (error) {
    return <EmptyKey description="anonymously.error.description" title="anonymously.error.title" />;
  }

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
