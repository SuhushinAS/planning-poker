import { ReactNode } from 'react';
import { AnonymouslyProvider } from 'src/modules/firebase/ui/Anonymously';
import { AuthProvider } from 'src/modules/firebase/ui/Auth';
import { DatabaseProvider } from 'src/modules/firebase/ui/Database';
import { FirebaseAppProvider } from 'src/modules/firebase/ui/FirebaseApp';
import { FirestoreProvider } from 'src/modules/firebase/ui/Firestore';

type Props = {
  children: ReactNode;
};

export const FirebaseProvider = ({ children }: Props) => {
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
