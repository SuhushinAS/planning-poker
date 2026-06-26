import { Route, Routes } from 'react-router';
import { GAME_ROOT, gamePath } from 'src/modules/game/lib/constants';
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
      <Route element={<GameNew />} path={GAME_ROOT} />
      <Route element={<GameItem />} path={gamePath.item} />
    </Routes>
  );
};
