import {DocumentSnapshot, onSnapshot} from 'firebase/firestore';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {useEffect, useState} from 'react';

export const useGame = (gameId: string) => {
  const [game, setGame] = useState<DocumentSnapshot>();
  const gameDocRef = useDocRef('game', gameId);

  useEffect(() => onSnapshot(gameDocRef, setGame), [gameDocRef]);

  return game;
};
