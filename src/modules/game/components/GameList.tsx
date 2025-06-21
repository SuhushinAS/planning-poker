import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {GameEmpty} from 'modules/game/components/GameEmpty';
import {GameListInner} from 'modules/game/components/GameListInner';
import {useGameList} from 'modules/game/model/useGameList';
import React from 'react';

export const GameList = () => {
  const anonymously = useAnonymouslyContext();
  const userId = anonymously.uid;
  const gameList = useGameList(userId);

  if (gameList === undefined) {
    return null;
  }

  if (gameList.empty) {
    return <GameEmpty />;
  }

  return <GameListInner gameList={gameList.docs} />;
};
