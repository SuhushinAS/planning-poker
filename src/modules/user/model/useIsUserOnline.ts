import {onValue, ref} from 'firebase/database';
import {useFirebaseDatabaseContext} from 'modules/firebase/components/FirebaseDatabase';
import {useEffect, useMemo, useState} from 'react';

export const useIsUserOnline = (userId: string) => {
  const firebaseDatabase = useFirebaseDatabaseContext();
  const connectedRef = useMemo(() => ref(firebaseDatabase, '.info/connected'), [firebaseDatabase]);
  const userRef = useMemo(() => ref(firebaseDatabase, `user/${userId}`), [firebaseDatabase, userId]);
  const [isUserOnline, setIsUserOnline] = useState<boolean>();

  useEffect(() => {
    onValue(userRef, (snap) => setIsUserOnline(snap.val()));
  }, [connectedRef, userRef]);

  return isUserOnline;
};
