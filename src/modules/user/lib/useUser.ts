import { DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';

export const useUser = (userId: string) => {
  const [user, setUser] = useState<DocumentSnapshot>();
  const userDocRef = useDocRef('user', userId);

  useEffect(() => onSnapshot(userDocRef, setUser), [userDocRef]);

  return user;
};
