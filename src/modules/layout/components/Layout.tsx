import {Scroll} from 'modules/common/components/Scroll';
import {Header} from 'modules/layout/components/Header';
import React, {ReactNode} from 'react';
import './Layout.less';

type TLayoutProps = {
  children: ReactNode;
};

export const Layout = (props: TLayoutProps) => {
  const {children} = props;

  return (
    <div className="Layout">
      <header className="Layout__Header">
        <Header />
      </header>
      <div className="Layout__Scroll">
        <Scroll dirList={['h', 'v']}>
          <div className="Layout__Inner">
            <main className="Layout__Body">{children}</main>
          </div>
        </Scroll>
      </div>
    </div>
  );
};
