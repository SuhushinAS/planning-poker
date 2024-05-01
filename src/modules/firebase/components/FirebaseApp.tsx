import {deleteApp, FirebaseApp, initializeApp} from 'firebase/app';
import {config} from 'modules/firebase/constants';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const FirebaseAppContext = createContext<FirebaseApp | undefined>(undefined);

export const FirebaseAppProvider = (props: Props) => {
  const {children} = props;
  const [app, setApp] = useState<FirebaseApp>();

  useEffect(() => {
    if (app === undefined) {
      setApp(initializeApp(config));
    }

    return () => {
      if (app !== undefined) {
        deleteApp(app);
        setApp(undefined);
      }
    };
  }, [app]);

  if (app === undefined) {
    return null;
  }

  return <FirebaseAppContext.Provider value={app}>{children}</FirebaseAppContext.Provider>;
};

export const useFirebaseAppContext = () => {
  const firebaseApp = useContext(FirebaseAppContext);

  if (firebaseApp === undefined) {
    throw new Error('useFirebaseAppContext can only be used in a FirebaseAppProvider');
  }

  return firebaseApp;
};
