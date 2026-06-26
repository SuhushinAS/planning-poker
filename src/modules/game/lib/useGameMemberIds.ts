import { updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';
import { useAnonymouslyContext } from 'src/modules/firebase/ui/Anonymously';

export const useGameMemberIds = (gameId: string) => {
  const anonymously = useAnonymouslyContext();
  const gameDocRef = useDocRef('game', gameId);

  useEffect(() => {
    updateDoc(gameDocRef, { [`memberIds.${anonymously.uid}`]: true });
  }, [anonymously.uid, gameDocRef]);
};
