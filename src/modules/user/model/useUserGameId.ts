import {useDbRef} from 'modules/firebase/lib/useDbRef';
import {useOnDbValue} from 'modules/firebase/lib/useOnDbValue';
import {useState} from 'react';

export const useUserGameId = (userId: string) => {
  const userRef = useDbRef(`user/${userId}`);
  const [userGameId, setUserGameId] = useState<string>();

  useOnDbValue(userRef, (snap) => setUserGameId(snap.val()));

  return userGameId;
};
