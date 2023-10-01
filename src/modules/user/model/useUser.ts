import {DocumentSnapshot, onSnapshot} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {useEffect, useState} from 'react';

export const useUser = (userId: string) => {
  const [user, setUser] = useState<DocumentSnapshot>();
  const userDocRef = useDocRef('user', userId);

  useEffect(() => onSnapshot(userDocRef, setUser), [userDocRef]);

  return user;
};
