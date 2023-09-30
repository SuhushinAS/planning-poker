import {App} from 'app/components/App';
import {store} from 'app/store';
import {Config} from 'modules/config/components/Config';
import {FirebaseAppProvider} from 'modules/firebase/components/FirebaseApp';
import {FirebaseAuthProvider} from 'modules/firebase/components/FirebaseAuth';
import {FirebaseAnonymProvider} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {FirebaseFirestoreProvider} from 'modules/firebase/components/FirebaseFirestore';
import {LocaleProvider} from 'modules/locale/components/LocaleProvider';
import React from 'react';
import {createRoot, Root} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import 'styles/index.less';

const getRender = (root: Root) => () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <LocaleProvider>
          <BrowserRouter>
            <Config>
              <FirebaseAppProvider>
                <FirebaseAuthProvider>
                  <FirebaseAnonymProvider>
                    <FirebaseFirestoreProvider>
                      <App />
                    </FirebaseFirestoreProvider>
                  </FirebaseAnonymProvider>
                </FirebaseAuthProvider>
              </FirebaseAppProvider>
            </Config>
          </BrowserRouter>
        </LocaleProvider>
      </Provider>
    </React.StrictMode>
  );
};

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  const render = getRender(root);

  render();

  if (module.hot) {
    module.hot.accept('app/components/App', render);
  }
}

const onRegisterError = (error) => {
  console.error('SW registration failed: ', error);
};

const onWindowLoad = () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(onRegisterError);
  }
};

window.removeEventListener('load', onWindowLoad);
window.addEventListener('load', onWindowLoad);
