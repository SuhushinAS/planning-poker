import { onSnapshot, QuerySnapshot, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useCollectionRef } from 'src/modules/firebase/lib/useCollectionRef';
import { useQueryConstraint } from 'src/modules/firebase/lib/useQueryConstraint';
import { TGame } from 'src/modules/game/lib/types';

export const useGameList = (userId: string) => {
  const [gameList, setGameList] = useState<QuerySnapshot<TGame, TGame>>();

  const queryConstraint = useMemo(() => where(`memberIds.${userId}`, '!=', null), [userId]);

  const q = useQueryConstraint<TGame, TGame>(useCollectionRef('game'), queryConstraint);

  useEffect(() => onSnapshot(q, setGameList), [q]);

  return gameList;
};
