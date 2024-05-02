import {combineReducers} from '@reduxjs/toolkit';
import {config} from 'modules/config/redux';
import {example} from 'modules/example/reducers';
import {locale} from 'modules/locale/reducers';
import {status} from 'modules/status/reducers';

export const rootReducer = combineReducers({
  [config.name]: config.reducer,
  [example.name]: example.reducer,
  [locale.name]: locale.reducer,
  [status.name]: status.reducer,
});
