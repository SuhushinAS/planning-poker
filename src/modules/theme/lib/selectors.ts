import { TState } from 'src/app/lib/types';
import { theme } from 'src/modules/theme/lib/reducers';
import { TTheme, TThemeDevice, TThemeStore } from 'src/modules/theme/lib/types';

export const selectThemeState = (state: TState): TThemeStore => state[theme.name];

export const selectThemeCurrent = (state: TState): TTheme => selectThemeState(state).current;

export const selectThemeDevice = (state: TState): TThemeDevice => selectThemeState(state).device;
