import { QueryDocumentSnapshot } from '@firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { Table } from 'src/modules/common/ui/Table';
import { TGame } from 'src/modules/game/lib/types';
import { GameListItem } from 'src/modules/game/ui/GameListItem';
import { Message } from 'src/modules/locale/ui/Message';

type Props = {
  gameList: QueryDocumentSnapshot<TGame>[];
};

type GameData = {
  data: TGame;
  id: string;
  index: number;
  sortProp: string;
};

const startDate = new Date(0);
const createDateDefault = Timestamp.fromDate(startDate);

const getGameData = (game: QueryDocumentSnapshot<TGame>, index: number): GameData => {
  const data = game.data();
  const sortProp = [data.createDate ?? createDateDefault, data.title].join('_');

  return { data, id: game.id, index, sortProp };
};

export const GameListInner = ({ gameList }: Props) => {
  const gameListSorted = useMemo(() => {
    return gameList.map(getGameData).toSorted((a, b) => {
      if (a.sortProp === b.sortProp) {
        return 0;
      }

      if (a.sortProp > b.sortProp) {
        return 1;
      }

      return -1;
    });
  }, [gameList]);

  const renderGame = useCallback((game: GameData, index: number) => {
    return <GameListItem game={game.data} gameId={game.id} index={index} key={game.id} />;
  }, []);

  return (
    <Table
      title={
        <h4>
          <Message id="game.list.title" />
        </h4>
      }
    >
      {gameListSorted.map(renderGame)}
    </Table>
  );
};
