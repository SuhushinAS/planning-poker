import {appPath} from 'app/constants';
import {Example} from 'modules/example/components/Example';
import {Game} from 'modules/game/components/Game';
import {Layout} from 'modules/layout/components/Layout';
import {useUserOnline} from 'modules/user/model/useUserOnline';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

export const App = () => {
  useUserOnline();
  return (
    <Layout>
      <Routes>
        <Route element={<Example />} path={`${appPath.example}/*`} />
        <Route element={<Game />} path="*" />
      </Routes>
    </Layout>
  );
};
