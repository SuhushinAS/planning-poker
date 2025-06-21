import {GameCreate} from 'modules/game/components/GameCreate';
import {GameJoin} from 'modules/game/components/GameJoin';
import {GameList} from 'modules/game/components/GameList';
import React from 'react';
import './GameNew.less';

export const GameNew = () => {
  return (
    <div className="GameNew box">
      <div className="box__row">
        <div className="box__col box__col_xs_12 box__col_md_4">
          <div className="box__row">
            <div className="box__col box__col_xs_12 box__col_sm_6 box__col_md_12">
              <div className="GameNew__Item">
                <GameCreate />
              </div>
            </div>
            <div className="box__col box__col_xs_12 box__col_sm_6 box__col_md_12">
              <div className="GameNew__Item">
                <GameJoin />
              </div>
            </div>
          </div>
        </div>
        <div className="box__col box__col_xs_12 box__col_md_8">
          <div className="GameNew__Item">
            <GameList />
          </div>
        </div>
      </div>
    </div>
  );
};
