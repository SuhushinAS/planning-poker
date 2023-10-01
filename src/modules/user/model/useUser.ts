import {DocumentSnapshot, onSnapshot} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {useEffect, useState} from 'react';

export const useUser = () => {
  const anonymously = useAnonymouslyContext();
  const [user, setUser] = useState<DocumentSnapshot>();
  const userDocRef = useDocRef('user', anonymously.uid);

  useEffect(() => onSnapshot(userDocRef, setUser), [userDocRef]);

  return user;
};
