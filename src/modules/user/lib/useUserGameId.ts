import { useState } from 'react';
import { useDbRef } from 'src/modules/firebase/lib/useDbRef';
import { useOnDbValue } from 'src/modules/firebase/lib/useOnDbValue';

export const useUserGameId = (userId: string) => {
  const userRef = useDbRef(`user/${userId}`);
  const [userGameId, setUserGameId] = useState<string>();

  useOnDbValue(userRef, (snap) => setUserGameId(snap.val()));

  return userGameId;
};
