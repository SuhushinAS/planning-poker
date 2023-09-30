import {appPath} from 'app/constants';
import {GameCreate} from 'modules/game/components/GameCreate';
import {GameItem} from 'modules/game/components/GameItem';
import {gamePath} from 'modules/game/constants';
import {useUser} from 'modules/user/model/useUser';
import React from 'react';
import {Navigate, Route, Routes} from 'react-router';

export const Game = () => {
  const user = useUser();

  if (user === undefined) {
    return null;
  }

  if (!user.exists()) {
    return <Navigate to={appPath.auth} />;
  }

  return (
    <Routes>
      <Route element={<GameCreate />} path={`${gamePath.home}/*`} />
      <Route element={<GameItem />} path={gamePath.item} />
    </Routes>
  );
};
