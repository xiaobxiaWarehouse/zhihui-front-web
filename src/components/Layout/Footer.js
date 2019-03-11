import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import styles from './Footer.less';

const Footer = () => {
  return (
    <div className="footer">
      {intl.get('App.footer')}
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default injectIntl(connect(mapStateToProps)(Footer));
