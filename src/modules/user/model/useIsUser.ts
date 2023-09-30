import {doc, onSnapshot} from 'firebase/firestore';
import {useFirebaseAnonymContext} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {useFirebaseFirestoreContext} from 'modules/firebase/components/FirebaseFirestore';
import {useEffect, useState} from 'react';

export const useIsUser = () => {
  const firebaseAnonym = useFirebaseAnonymContext();
  const firebaseFirestore = useFirebaseFirestoreContext();
  const [isUser, setIsUser] = useState<boolean>();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(firebaseFirestore, 'user', firebaseAnonym.uid), (snap) => {
      setIsUser(snap.exists());
    });

    return unsubscribe;
  }, [firebaseAnonym.uid, firebaseFirestore]);

  return isUser;
};
