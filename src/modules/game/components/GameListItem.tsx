import {gamePath} from 'modules/game/constants';
import {TGame} from 'modules/game/types';
import React from 'react';
import {generatePath} from 'react-router';
import {Link} from 'react-router-dom';
import './GameListItem.less';

type Props = {
  game: TGame;
  gameId: string;
  index: number;
};

export const GameListItem = ({game, gameId, index}: Props) => {
  const link = <Link className="GameListItem__Link" to={generatePath(gamePath.item, {gameId})}></Link>;
  return (
    <tr>
      <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed">
        {link}
        <p className="offset_ver">{index + 1}</p>
      </td>
      <td className="Table__Cell Table__Cell_Title">
        {link}
        <p className="offset">
          {game.title} ({game.createDate.toDate().toLocaleDateString()})
        </p>
      </td>
    </tr>
  );
};
