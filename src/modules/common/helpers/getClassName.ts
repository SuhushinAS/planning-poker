export const getClassName = (classNameBase: string, className?: string) => {
  const buttonClassList = classNameBase.split(' ');

  if (className !== undefined) {
    buttonClassList.push(className);
  }

  return buttonClassList.join(' ');
};
