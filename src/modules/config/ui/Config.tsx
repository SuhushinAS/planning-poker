import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/lib/hooks';
import { EmptyKey } from 'src/modules/common/ui/EmptyKey';
import { actionGetConfig } from 'src/modules/config/lib/actions';
import { configActions } from 'src/modules/config/lib/reducers';
import { selectStatusItem } from 'src/modules/status/lib/selectors';
import { Status } from 'src/modules/status/lib/types';

type TConfigProps = {
  children: ReactNode;
};

export const Config = ({ children }: TConfigProps) => {
  const dispatch = useAppDispatch();
  const configStatus = useAppSelector(selectStatusItem(configActions.update.type));

  useEffect(() => {
    if (configStatus === undefined) {
      dispatch(actionGetConfig());
    }
  }, [configStatus, dispatch]);

  if (Status.error === configStatus) {
    return <EmptyKey description="config.error.description" title="config.error.title" />;
  }

  if (Status.success !== configStatus) {
    return null;
  }

  return children;
};
