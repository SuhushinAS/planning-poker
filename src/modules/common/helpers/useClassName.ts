import {useMemo} from 'react';

export const useClassName = (classNameBase: string, className: string = '') => {
  return useMemo(() => {
    const buttonClassList = className.split(' ');

    buttonClassList.push(classNameBase);

    return buttonClassList.join(' ');
  }, [className, classNameBase]);
};
