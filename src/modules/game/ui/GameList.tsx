import { useAnonymouslyContext } from 'src/modules/firebase/ui/Anonymously';
import { useGameList } from 'src/modules/game/lib/useGameList';
import { GameEmpty } from 'src/modules/game/ui/GameEmpty';
import { GameListInner } from 'src/modules/game/ui/GameListInner';

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
