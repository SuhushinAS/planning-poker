import {Scroll} from 'modules/common/components/Scroll';
import {Header} from 'modules/layout/components/Header';
import React from 'react';
import './Layout.less';

type TLayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({children}: TLayoutProps) => {
  return (
    <div className="Layout">
      <header className="Layout__Header">
        <Header />
      </header>
      <div className="Layout__Scroll">
        <Scroll dirList={['h', 'v']}>
          <div className="Layout__Inner">
            <div className="Layout__HeaderSize" />
            <main className="Layout__Body">{children}</main>
          </div>
        </Scroll>
      </div>
    </div>
  );
};
