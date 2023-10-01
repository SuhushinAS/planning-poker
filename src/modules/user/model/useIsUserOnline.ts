import {useDbRef} from 'modules/firebase/lib/useDbRef';
import {useOnDbValue} from 'modules/firebase/lib/useOnDbValue';
import {useState} from 'react';

export const useIsUserOnline = (userId: string) => {
  const userRef = useDbRef(`user/${userId}`);
  const [isUserOnline, setIsUserOnline] = useState<boolean>();

  useOnDbValue(userRef, (snap) => setIsUserOnline(snap.val()));

  return isUserOnline;
};
