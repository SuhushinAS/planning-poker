import {Database, getDatabase} from 'firebase/database';
import {useFirebaseAppContext} from 'modules/firebase/components/FirebaseApp';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const DatabaseContext = createContext<Database | undefined>(undefined);

export const DatabaseProvider = (props: Props) => {
  const {children} = props;
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
