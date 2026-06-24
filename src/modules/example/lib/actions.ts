import { TDispatch } from 'src/app/lib/types';
import { api } from 'src/modules/common/lib/api';
import { exampleActions } from 'src/modules/example/lib/reducers';
import { TExample } from 'src/modules/example/lib/types';
import { getActionSetStatus } from 'src/modules/status/lib/actions';
import { Status } from 'src/modules/status/lib/types';

export const actionExampleGetList = () => (dispatch: TDispatch) => {
  const exampleGetListStatusSet = getActionSetStatus(exampleActions.getList.type);

  dispatch(exampleGetListStatusSet(Status.loading));

  return api
    .requestLocal<TExample[]>('/api/v1/example.json')
    .then((data) => {
      dispatch(exampleActions.getList(data));
      dispatch(exampleGetListStatusSet(Status.success));
    })
    .catch(() => {
      dispatch(exampleGetListStatusSet(Status.error));
    });
};
