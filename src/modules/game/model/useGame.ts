import {DocumentSnapshot, onSnapshot, setDoc} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {TGame} from 'modules/game/types';
import {useEffect, useState} from 'react';

export const useGame = (gameId: string) => {
  const anonymously = useAnonymouslyContext();
  const [game, setGame] = useState<DocumentSnapshot>();
  const gameDocRef = useDocRef('game', gameId);

  useEffect(() => onSnapshot(gameDocRef, setGame), [gameDocRef]);

  useEffect(() => {
    if (game !== undefined && game.exists()) {
      const gameData = game.data() as TGame;

      setDoc(gameDocRef, {
        ...gameData,
        memberIdList: [...new Set([...gameData.memberIdList, anonymously.uid])],
      });
    }
  }, [anonymously.uid, game, gameDocRef]);

  return game;
};
