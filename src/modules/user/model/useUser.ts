import {DocumentSnapshot, doc, onSnapshot} from 'firebase/firestore';
import {useFirebaseAnonymContext} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {useFirebaseFirestoreContext} from 'modules/firebase/components/FirebaseFirestore';
import {useEffect, useMemo, useState} from 'react';

export const useUser = () => {
  const firebaseAnonym = useFirebaseAnonymContext();
  const firebaseFirestore = useFirebaseFirestoreContext();
  const [user, setUser] = useState<DocumentSnapshot>();
  const userRef = useMemo(
    () => doc(firebaseFirestore, 'user', firebaseAnonym.uid),
    [firebaseAnonym.uid, firebaseFirestore]
  );

  useEffect(() => onSnapshot(userRef, setUser), [userRef]);

  return user;
};
