import {FirebaseAppProvider} from 'modules/firebase/components/FirebaseApp';
import {FirebaseAuthProvider} from 'modules/firebase/components/FirebaseAuth';
import {FirebaseAnonymProvider} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {FirebaseDatabaseProvider} from 'modules/firebase/components/FirebaseDatabase';
import {FirebaseFirestoreProvider} from 'modules/firebase/components/FirebaseFirestore';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

export const FirebaseProvider = ({children}: Props) => (
  <FirebaseAppProvider>
    <FirebaseAuthProvider>
      <FirebaseAnonymProvider>
        <FirebaseFirestoreProvider>
          <FirebaseDatabaseProvider>{children}</FirebaseDatabaseProvider>
        </FirebaseFirestoreProvider>
      </FirebaseAnonymProvider>
    </FirebaseAuthProvider>
  </FirebaseAppProvider>
);
