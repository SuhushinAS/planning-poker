import {combineReducers} from '@reduxjs/toolkit';
import {config} from 'modules/config/reducers';
import {example} from 'modules/example/reducers';
import {locale} from 'modules/locale/reducers';
import {status} from 'modules/status/reducers';
import {theme} from 'modules/theme/reducers';

export const rootReducer = combineReducers({
  [config.name]: config.reducer,
  [example.name]: example.reducer,
  [locale.name]: locale.reducer,
  [status.name]: status.reducer,
  [theme.name]: theme.reducer,
});
