import {App} from 'app/components/App';
import {rootElement} from 'app/constants';
import {store} from 'app/store';
import {Config} from 'modules/config/components/Config';
import {LocaleProvider} from 'modules/locale/components/LocaleProvider';
import React, {StrictMode} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';

const getRender = (root: Root) => () => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <LocaleProvider>
          <HashRouter>
            <Config>
              <App />
            </Config>
          </HashRouter>
        </LocaleProvider>
      </Provider>
    </StrictMode>
  );
};

if (rootElement) {
  const root = createRoot(rootElement);
  const render = getRender(root);

  render();

  if (module.hot) {
    module.hot.accept('app/components/App', render);
  }
}

const onRegisterError = (error: Error) => {
  console.error('SW registration failed: ', error);
};

const onWindowLoad = () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(onRegisterError);
  }
};

window.removeEventListener('load', onWindowLoad);
window.addEventListener('load', onWindowLoad);
