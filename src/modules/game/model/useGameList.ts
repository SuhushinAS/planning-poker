import {onSnapshot, QuerySnapshot, where} from 'firebase/firestore';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
import {useQueryConstraint} from 'modules/firebase/lib/useQueryConstraint';
import {TGame} from 'modules/game/types';
import {useEffect, useMemo, useState} from 'react';

export const useGameList = (userId: string) => {
  const [gameList, setGameList] = useState<QuerySnapshot<TGame, TGame>>();

  const queryConstraint = useMemo(() => where(`memberIds.${userId}`, '!=', null), [userId]);

  const q = useQueryConstraint<TGame, TGame>(useCollectionRef('game'), queryConstraint);

  useEffect(() => onSnapshot(q, setGameList), [q]);

  return gameList;
};
