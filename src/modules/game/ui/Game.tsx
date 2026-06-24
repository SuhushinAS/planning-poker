import { Route, Routes } from 'react-router';
import { gamePath } from 'src/modules/game/lib/constants';
import { GameItem } from 'src/modules/game/ui/GameItem';
import { GameNew } from 'src/modules/game/ui/GameNew';
import { useUserSelf } from 'src/modules/user/lib/useUserSelf';
import { Auth } from 'src/modules/user/ui/Auth';

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
