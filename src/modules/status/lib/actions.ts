import { TDispatch } from 'src/app/lib/types';
import { statusActions } from 'src/modules/status/lib/reducers';
import { TStatus } from 'src/modules/status/lib/types';

export const getActionSetStatus = (type: string) => (status: TStatus) => (dispatch: TDispatch) => {
  return dispatch(statusActions.setStatus({ status, type }));
};
