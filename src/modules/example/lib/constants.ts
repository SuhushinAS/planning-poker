import { getFullLink } from 'src/modules/common/lib/getFullLink';

export const examplePaths = {
  item: '/:exampleId',
  list: '/',
} as const;

const EXAMPLE_ROOT = '/example' as const;

const getExampleLink = getFullLink(EXAMPLE_ROOT);

export const exampleLinks = {
  item: getExampleLink(examplePaths.item),
  list: getExampleLink(examplePaths.list),
};

export const exampleIdKey = '_id';
