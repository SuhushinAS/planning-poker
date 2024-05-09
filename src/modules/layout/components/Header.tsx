import {appPath} from 'app/constants';
import {LocaleSelector} from 'modules/locale/components/LocaleSelector';
import {Message} from 'modules/locale/components/Message';
import {ThemeSelector} from 'modules/theme/components/ThemeSelector';
import React from 'react';
import {Link} from 'react-router-dom';
import './Header.less';

export const Header = () => (
  <div className="Header offset_ver">
    <div className="Header__Box box ">
      <div className="Header__Row box__row">
        <h1 className="Header__Title box__col box__col_xs_auto">
          <Link className="Header__TitleLink" to={appPath.home}>
            <Message id="app.title" />
          </Link>
        </h1>
        <div className="Header__Col box__col box__col_xs_auto">
          <ThemeSelector />
        </div>
        <div className="Header__Col box__col box__col_xs_auto">
          <LocaleSelector />
        </div>
      </div>
    </div>
  </div>
);
