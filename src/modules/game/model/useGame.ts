import {DocumentSnapshot, doc, onSnapshot} from 'firebase/firestore';
import {useFirebaseFirestoreContext} from 'modules/firebase/components/FirebaseFirestore';
import {useEffect, useState} from 'react';

export const useGame = (gameId: string) => {
  const firebaseFirestore = useFirebaseFirestoreContext();
  const [game, setGame] = useState<DocumentSnapshot>();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(firebaseFirestore, 'game', gameId), (snap) => {
      setGame(snap);
    });

    return unsubscribe;
  }, [firebaseFirestore, gameId]);

  return game;
};
