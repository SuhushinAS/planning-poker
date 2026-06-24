import { ReactNode } from 'react';
import { Scroll } from 'src/modules/common/ui/Scroll';
import { Header } from 'src/modules/layout/ui/Header';
import './Layout.less';

type TLayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: TLayoutProps) => {
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
