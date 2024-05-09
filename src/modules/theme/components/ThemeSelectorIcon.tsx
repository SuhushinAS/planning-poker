import {SvgIcon} from 'modules/common/components/SvgIcon';
import 'modules/theme/components/ThemeSelector.less';
import {TTheme, TThemeAuto, TThemeDevice} from 'modules/theme/types';
import React, {useMemo} from 'react';

type Props = {
  isCurrent: boolean;
  theme: TTheme;
};

const themeIconMap = {
  [TThemeAuto.auto]: 'adjust',
  [TThemeDevice.dark]: 'moon-o',
  [TThemeDevice.light]: 'sun-o',
};

export const ThemeSelectorIcon = (props: Props) => {
  const {isCurrent, theme} = props;

  const className = useMemo(() => {
    const classList = ['ThemeSelector__Icon'];

    if (isCurrent) {
      classList.push('ThemeSelector__Icon_Current');
    }

    return classList.join(' ');
  }, [isCurrent]);

  return <SvgIcon className={className} name={themeIconMap[theme]} />;
};
