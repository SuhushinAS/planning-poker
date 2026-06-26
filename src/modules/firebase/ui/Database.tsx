import { Database, getDatabase } from 'firebase/database';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useFirebaseAppContext } from 'src/modules/firebase/ui/FirebaseApp';

type Props = {
  children: ReactNode;
};

const DatabaseContext = createContext<Database | undefined>(undefined);

export const DatabaseProvider = ({ children }: Props) => {
  const firebaseApp = useFirebaseAppContext();
  const [database, setDatabase] = useState<Database>();

  useEffect(() => {
    setDatabase(getDatabase(firebaseApp));
  }, [firebaseApp]);

  if (database === undefined) {
    return null;
  }

  return <DatabaseContext.Provider value={database}>{children}</DatabaseContext.Provider>;
};

export const useDatabaseContext = () => {
  const database = useContext(DatabaseContext);

  if (database === undefined) {
    throw new Error('useDatabaseContext can only be used in a DatabaseProvider');
  }

  return database;
};
