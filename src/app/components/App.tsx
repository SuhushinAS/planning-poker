import {appPath} from 'app/constants';
import {FirebaseProvider} from 'modules/firebase/components/Firebase';
import {Game} from 'modules/game/components/Game';
import {Layout} from 'modules/layout/components/Layout';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import 'styles/index.less';

export const App = () => {
  return (
    <Layout>
      <FirebaseProvider>
        <Routes>
          <Route element={<Game />} path={`${appPath.home}*`} />
        </Routes>
      </FirebaseProvider>
    </Layout>
  );
};
