import { generatePath } from 'react-router-dom';
import { getFullPath } from 'src/modules/common/lib/getFullPath';
import { PathParams } from 'src/modules/common/lib/types';

export const examplePaths = {
  item: '/:exampleId',
  list: '/',
} as const;

const EXAMPLE_ROOT = '/example' as const;

export const getExamplePath = getFullPath(EXAMPLE_ROOT);

const getExampleLink = <Path extends string>(path: Path) => {
  const fullPath = getExamplePath(path);

  return (params: PathParams<typeof fullPath>) => {
    return generatePath(fullPath, params);
  };
};

export const exampleLinks = {
  item: getExampleLink(examplePaths.item),
  list: getExampleLink(examplePaths.list),
};

export const exampleIdKey = '_id';
