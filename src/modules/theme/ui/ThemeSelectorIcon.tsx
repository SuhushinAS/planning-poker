import { useMemo } from 'react';
import { SvgIcon } from 'src/modules/common/ui/SvgIcon';
import { ThemeAuto, ThemeDevice, TTheme } from 'src/modules/theme/lib/types';
import 'src/modules/theme/ui/ThemeSelector.less';

type Props = {
  isCurrent: boolean;
  theme: TTheme;
};

const themeIconMap = {
  [ThemeAuto.auto]: 'adjust',
  [ThemeDevice.dark]: 'moon-o',
  [ThemeDevice.light]: 'sun-o',
};

export const ThemeSelectorIcon = ({ isCurrent, theme }: Props) => {
  const className = useMemo(() => {
    const classList = ['ThemeSelector__Icon'];

    if (isCurrent) {
      classList.push('ThemeSelector__Icon_Current');
    }

    return classList.join(' ');
  }, [isCurrent]);

  return <SvgIcon className={className} name={themeIconMap[theme]} />;
};
