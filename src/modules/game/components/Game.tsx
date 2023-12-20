import {GameItem} from 'modules/game/components/GameItem';
import {GameNew} from 'modules/game/components/GameNew';
import {gamePath} from 'modules/game/constants';
import {Auth} from 'modules/user/components/Auth';
import {useUserSelf} from 'modules/user/model/useUserSelf';
import React from 'react';
import {Route, Routes} from 'react-router';

export const Game = () => {
  const user = useUserSelf();

  if (user === undefined) {
    return null;
  }

  if (!user.exists()) {
    return <Auth />;
  }

  return (
    <Routes>
      <Route element={<GameNew />} path={`${gamePath.home}*`} />
      <Route element={<GameItem />} path={gamePath.item} />
    </Routes>
  );
};
