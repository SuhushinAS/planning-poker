import {TState} from 'app/types';
import {config} from 'modules/config/reducers';

export const selectConfig = (state: TState) => state[config.name];
