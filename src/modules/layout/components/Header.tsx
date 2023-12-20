import {appPath} from 'app/constants';
import {LocaleSelector} from 'modules/locale/components/LocaleSelector';
import {Message} from 'modules/locale/components/Message';
import React from 'react';
import {Link} from 'react-router-dom';
import './Header.less';

export const Header = () => (
  <div className="Header">
    <div className="Header__Inner box">
      <h1 className="Header__Title">
        <Link className="Header__TitleLink" to={appPath.home}>
          <Message id="app.title" />
        </Link>
      </h1>
      <div className="Header__Lang">
        <LocaleSelector />
      </div>
    </div>
  </div>
);
