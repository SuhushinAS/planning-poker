import { clsx } from 'clsx';
import { iconMap } from 'src/modules/common/lib/iconMap';
import './SvgIcon.less';

type Props = {
  className?: string;
  name?: string;
};

const spritePath = '/sprite.svg';
const warnedNames = new Set<string>();

const warn = (name: string, message: string): void => {
  const key = `${name}:${message}`;

  if (!warnedNames.has(key)) {
    warnedNames.add(key);
    console.warn(message);
  }
};

export const SvgIcon = ({ className, name = '' }: Props) => {
  if (!name) {
    warn(name, `${name} is not correct`);

    return null;
  }

  const viewBox = iconMap[name];

  if (!viewBox) {
    warn(name, `${name} is not found`);

    return null;
  }

  return (
    <svg className={clsx('SvgIcon', className)} viewBox={viewBox}>
      <use href={`${spritePath}#${name}`} xlinkHref={`${spritePath}#${name}`} />
    </svg>
  );
};
