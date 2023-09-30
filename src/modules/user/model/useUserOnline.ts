import {onDisconnect, onValue, push, ref, set} from 'firebase/database';
import {useFirebaseAnonymContext} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {useFirebaseDatabaseContext} from 'modules/firebase/components/FirebaseDatabase';
import {useEffect, useMemo} from 'react';

export const useUserOnline = () => {
  const firebaseAnonym = useFirebaseAnonymContext();
  const firebaseDatabase = useFirebaseDatabaseContext();
  const connectedRef = useMemo(() => ref(firebaseDatabase, '.info/connected'), [firebaseDatabase]);
  const userRef = useMemo(
    () => ref(firebaseDatabase, `user/${firebaseAnonym.uid}`),
    [firebaseAnonym.uid, firebaseDatabase]
  );

  useEffect(() => {
    onValue(connectedRef, (snap) => {
      if (true === snap.val()) {
        const connection = push(userRef);

        onDisconnect(connection).remove();
        set(connection, true);
      }
    });
  }, [connectedRef, userRef]);
};
