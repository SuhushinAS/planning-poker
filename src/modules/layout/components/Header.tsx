import 'modules/layout/components/Header.less';
import {LocaleSelectorContainer} from 'modules/locale/components/LocaleSelector';
import React from 'react';

export const Header = () => (
  <div className="Header">
    <div className="Header__Inner box">
      <div className="Header__Divider" />
      <div className="Header__Lang">
        <LocaleSelectorContainer />
      </div>
    </div>
  </div>
);
