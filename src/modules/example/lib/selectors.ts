import { createAppSelector } from 'src/app/lib/hooks';
import { TState } from 'src/app/lib/types';
import { getList } from 'src/modules/common/lib/selectors';
import { exampleName } from 'src/modules/example/lib/reducers';

export const selectExample = (state: TState) => {
  return state[exampleName];
};

export const selectExampleData = (state: TState) => {
  return selectExample(state).data;
};

export const selectExampleIdList = (state: TState) => {
  return selectExample(state).list;
};

export const selectExampleList = createAppSelector(
  [selectExampleData, selectExampleIdList],
  getList,
);

export const selectExampleItem = (exampleId: string) => {
  return createAppSelector([selectExampleData], (data) => data[exampleId]);
};
