import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from 'src/app/lib/hooks';
import { actionExampleGetList } from 'src/modules/example/lib/actions';
import { examplePaths } from 'src/modules/example/lib/constants';
import { ExamplePageItem } from 'src/modules/example/ui/ExamplePageItem';
import { ExamplePageList } from 'src/modules/example/ui/ExamplePageList';

export const Example = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionExampleGetList());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<ExamplePageList />} path={examplePaths.list} />
      <Route element={<ExamplePageItem />} path={examplePaths.item} />
    </Routes>
  );
};
