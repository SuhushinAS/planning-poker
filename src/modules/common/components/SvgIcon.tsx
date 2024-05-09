import {getClassName} from 'modules/common/helpers/getClassName';
import React, {PureComponent} from 'react';
import './SvgIcon.less';

type Props = {
  className?: string;
  name: string;
};

type State = TIcon;

type TImport = {
  default: TIcon;
};

type TIcon = {
  symbol: string;
  toString: any;
  view: string;
  viewBox: string;
};

export class SvgIcon extends PureComponent<Props, State> {
  static defaultProps = {
    name: '',
  };
  isMount = false;
  state = {
    symbol: '',
    view: '',
    viewBox: '',
  };

  constructor(props: Props) {
    super(props);
    const {name} = props;

    if (name) {
      this.importSvg(name);
    } else {
      console.warn(`${name} is not correct`);
    }
  }

  componentDidMount() {
    this.isMount = true;
  }

  componentDidUpdate(props: Props) {
    const {name} = this.props;
    if (name !== props.name) {
      this.importSvg(name);
    }
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  handleError = (): void => {
    console.warn(`${this.props.name} is not found`);
  };

  handleImport = (icon: TImport): void => {
    if (this.isMount) {
      this.setState({...icon.default});
    }
  };

  importSvg(name: string) {
    import(
      /* webpackChunkName: "icon" */
      `icons/${name}.svg`
    )
      .then(this.handleImport)
      .catch(this.handleError);
  }

  render() {
    const {symbol, viewBox} = this.state;

    if (symbol) {
      return (
        <svg className={getClassName('SvgIcon', this.props.className)} viewBox={viewBox}>
          <use xlinkHref={symbol} />
        </svg>
      );
    }

    return null;
  }
}
