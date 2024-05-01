import {AnonymouslyProvider} from 'modules/firebase/components/Anonymously';
import {AuthProvider} from 'modules/firebase/components/Auth';
import {DatabaseProvider} from 'modules/firebase/components/Database';
import {FirebaseAppProvider} from 'modules/firebase/components/FirebaseApp';
import {FirestoreProvider} from 'modules/firebase/components/Firestore';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

export const FirebaseProvider = (props: Props) => {
  const {children} = props;

  return (
    <FirebaseAppProvider>
      <AuthProvider>
        <AnonymouslyProvider>
          <FirestoreProvider>
            <DatabaseProvider>{children}</DatabaseProvider>
          </FirestoreProvider>
        </AnonymouslyProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
};
