import { generatePath } from 'react-router-dom';

export type PathParams<Path extends string> = Parameters<typeof generatePath<Path>>[1];

export const getFullLink = <Root extends string>(root: Root) => {
  return <Path extends string>(path: Path) => {
    return (params: PathParams<`${Root}${Path}`>) => {
      return generatePath(`${root}${path}`, params);
    };
  };
};
