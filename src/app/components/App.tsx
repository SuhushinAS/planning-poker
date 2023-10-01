import {appPath} from 'app/constants';
import {Example} from 'modules/example/components/Example';
import {FirebaseProvider} from 'modules/firebase/components/Firebase';
import {RenderProvider} from 'modules/firebase/components/Render';
import {Game} from 'modules/game/components/Game';
import {Layout} from 'modules/layout/components/Layout';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

export const App = () => {
  return (
    <Layout>
      <RenderProvider>
        <FirebaseProvider>
          <Routes>
            <Route element={<Example />} path={`${appPath.example}/*`} />
            <Route element={<Game />} path="*" />
          </Routes>
        </FirebaseProvider>
      </RenderProvider>
    </Layout>
  );
};
