import {useAppDispatch} from 'app/hooks';
import {actionThemeCurrentSet} from 'modules/theme/actions';
import {themeDark} from 'modules/theme/constants';
import {getThemeCurrent, getThemeDevice} from 'modules/theme/helpers';
import {themeActions} from 'modules/theme/reducers';
import {useCallback, useEffect} from 'react';

export const useThemeCurrent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const themeCurrent = getThemeCurrent();

    dispatch(actionThemeCurrentSet(themeCurrent));
  }, [dispatch]);
};

export const useThemeDevice = () => {
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (e: MediaQueryListEvent) => {
      const themeDevice = getThemeDevice(e);

      dispatch(themeActions.setDevice(themeDevice));
    },
    [dispatch]
  );

  useEffect(() => {
    const themeDevice = getThemeDevice(themeDark);

    dispatch(themeActions.setDevice(themeDevice));
  }, [dispatch]);

  useEffect(() => {
    themeDark.addEventListener('change', onChange);

    return () => {
      themeDark.removeEventListener('change', onChange);
    };
  }, [onChange]);
};
