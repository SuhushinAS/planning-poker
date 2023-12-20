import {GameCreate} from 'modules/game/components/GameCreate';
import {GameJoin} from 'modules/game/components/GameJoin';
import React from 'react';
import './GameNew.less';

export const GameNew = () => {
  return (
    <div className="GameNew box">
      <div className="box__row">
        <div className="box__col box__col_xs_12 box__col_sm_6">
          <div className="GameNew__Item">
            <GameCreate />
          </div>
        </div>
        <div className="box__col box__col_xs_12 box__col_sm_6">
          <div className="GameNew__Item">
            <GameJoin />
          </div>
        </div>
      </div>
    </div>
  );
};
