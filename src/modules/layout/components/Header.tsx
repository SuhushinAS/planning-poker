import 'modules/layout/components/Header.less';
import {LocaleSelectorContainer} from 'modules/locale/components/LocaleSelector';
import {Message} from 'modules/locale/components/Message';
import React from 'react';

export const Header = () => (
  <div className="Header">
    <div className="Header__Inner box">
      <h1 className="Header__Title">
        <Message id="app.title" />
      </h1>
      <div className="Header__Lang">
        <LocaleSelectorContainer />
      </div>
    </div>
  </div>
);
