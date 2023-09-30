import {appPath} from 'app/constants';
import {Example} from 'modules/example/components/Example';
import {Game} from 'modules/game/components/Game';
import {Layout} from 'modules/layout/components/Layout';
import {Auth} from 'modules/user/components/Auth';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<Auth />} path={`${appPath.auth}/*`} />
        <Route element={<Example />} path={`${appPath.example}/*`} />
        <Route element={<Game />} path="*" />
      </Routes>
    </Layout>
  );
};
