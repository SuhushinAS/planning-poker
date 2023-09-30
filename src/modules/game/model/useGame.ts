import {DocumentSnapshot, doc, onSnapshot, setDoc} from 'firebase/firestore';
import {useFirebaseAnonymContext} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {useFirebaseFirestoreContext} from 'modules/firebase/components/FirebaseFirestore';
import {TGame} from 'modules/game/types';
import {useEffect, useMemo, useState} from 'react';

export const useGame = (gameId: string) => {
  const firebaseAnonym = useFirebaseAnonymContext();
  const firebaseFirestore = useFirebaseFirestoreContext();
  const [game, setGame] = useState<DocumentSnapshot>();
  const gameDoc = useMemo(() => doc(firebaseFirestore, 'game', gameId), [firebaseFirestore, gameId]);

  useEffect(() => onSnapshot(gameDoc, setGame), [gameDoc]);

  useEffect(() => {
    if (game !== undefined && game.exists()) {
      const gameData = game.data() as TGame;

      setDoc(gameDoc, {
        ...gameData,
        memberIdList: [...new Set([...gameData.memberIdList, firebaseAnonym.uid])],
      });
    }
  }, [firebaseAnonym.uid, game, gameDoc]);

  return game;
};
