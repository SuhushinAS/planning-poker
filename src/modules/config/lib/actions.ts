import { TDispatch } from 'src/app/lib/types';
import { api } from 'src/modules/common/lib/api';
import { configActions } from 'src/modules/config/lib/reducers';
import { TConfig } from 'src/modules/config/lib/types';
import { getActionSetStatus } from 'src/modules/status/lib/actions';
import { Status } from 'src/modules/status/lib/types';

export const actionGetConfig = () => (dispatch: TDispatch) => {
  const configUpdateStatusSet = getActionSetStatus(configActions.update.type);

  dispatch(configUpdateStatusSet(Status.loading));

  return api
    .requestLocal<TConfig>('/api/v1/config.json')
    .then((data) => {
      api.host = data.host;
      dispatch(configActions.update(data));
      dispatch(configUpdateStatusSet(Status.success));
    })
    .catch(() => {
      dispatch(configUpdateStatusSet(Status.error));
    });
};
