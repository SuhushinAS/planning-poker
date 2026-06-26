import { DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';

export const useGame = (gameId: string) => {
  const [game, setGame] = useState<DocumentSnapshot>();
  const gameDocRef = useDocRef('game', gameId);

  useEffect(() => onSnapshot(gameDocRef, setGame), [gameDocRef]);

  return game;
};
