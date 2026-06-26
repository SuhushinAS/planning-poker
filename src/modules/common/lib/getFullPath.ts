export const getFullPath = <Root extends string>(root: Root) => {
  return <Path extends string>(path: Path) => {
    return `${root}${path}` as const;
  };
};
