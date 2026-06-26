import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'src/app/lib/store';
import { ErrorBoundary } from 'src/modules/common/ui/ErrorBoundary';
import { Config } from 'src/modules/config/ui/Config';
import { FirebaseProvider } from 'src/modules/firebase/ui/Firebase';
import { GAME_ROOT } from 'src/modules/game/lib/constants';
import { Game } from 'src/modules/game/ui/Game';
import { Layout } from 'src/modules/layout/ui/Layout';
import { LocaleProvider } from 'src/modules/locale/ui/LocaleProvider';

export const App = () => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <LocaleProvider>
              <Config>
                <FirebaseProvider>
                  <Layout>
                    <Routes>
                      <Route element={<Game />} path={`${GAME_ROOT}*`} />
                    </Routes>
                  </Layout>
                </FirebaseProvider>
              </Config>
            </LocaleProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
};
