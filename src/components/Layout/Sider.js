import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import { config } from 'utils';
import styles from './Layout.less';
import Menus from './Menu';
import imgLogo from '../../public/logo.png';
import imgLogoCube from '../../public/logo-cube.png';

const Sider = (props) => {
  const {
    siderFold,
    darkTheme,
    location,
    changeTheme,
    navOpenKeys,
    changeOpenKeys,
    menu,
  } = props;
  const menusProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  };
  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <img alt="logo" src={siderFold ? imgLogoCube : imgLogo}/>
      </div>
      <Menus {...menusProps}/>
    </div>
  );
};

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

function mapStateToProps(state) {
  return {
  };
}

export default injectIntl(connect(mapStateToProps)(Sider));
