export const getClassName = (classNameBase: string, className?: string) => {
  const classList = classNameBase.split(' ');

  if (className !== undefined) {
    classList.push(className);
  }

  return classList.join(' ');
};
