import {updateDoc} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {useEffect} from 'react';

export const useGameMemberIds = (gameId: string) => {
  const anonymously = useAnonymouslyContext();
  const gameDocRef = useDocRef('game', gameId);

  useEffect(() => {
    updateDoc(gameDocRef, {[`memberIds.${anonymously.uid}`]: true});
  }, [anonymously.uid, gameDocRef]);
};
