import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { injectIntl } from 'react-intl';
import intl from 'react-intl-universal';
import { Menu, Icon, Row, Col } from 'antd';
import { classnames, config } from 'utils';
import { Icon as JXRSIcon, MenuItem as JXRSMenuItem } from '../JXRS';
import styles from './Header.less';

const { SubMenu } = Menu;

const Header = (props) => {
  const {
    navBtn,
    filter,
    changeIsOpenNav,
    isOpenNav,
    title,
    menu,
    dispatch,
  } = props;

  const handleClick = (item) => {
    if (item.url === '/logout') {
      dispatch({ type: 'app/logout' });
    } else {
      dispatch(routerRedux.push(item.url));
    }
  };

  const handleMaskClick = () => {
    dispatch({
      type: 'app/changeIsOpenNav',
      payload: false,
    });
  };

  return (
    <div
      className={classnames('header', isOpenNav ? 'navOpen' : '')}
    >
      <div className="navGroup">
        <Row className="nav">
          <Col className="title" onClick={changeIsOpenNav}>
            {title}
            <JXRSIcon
              onClick={changeIsOpenNav}
              style={{ fontSize: 14, marginLeft: 6 }}
              type="bars"
            />
          </Col>
          {navBtn && <Col className="navBtn">{navBtn}</Col>}
        </Row>
        {isOpenNav && (
          <Row className="navMenuItem" type="flex" align="middle">
            {menu &&
              menu.length &&
              menu
                .filter((item) => {
                  return item.sideMenu;
                })
                .map((item) => {
                  const menuItemProps = {
                    item,
                    type: item.icon,
                    size: 'sm',
                    label: item.name,
                    handleClick,
                  };
                  return (
                    <Col span={6} key={item.code} className="col-menuitem">
                      <JXRSMenuItem {...menuItemProps} />
                    </Col>
                  );
                })}
          </Row>
        )}
      </div>
      <div className="navGroupHolder" />
      {isOpenNav && <div className="mask" onClick={handleMaskClick} />}
      {filter && (
        <div className={title === '监测列表' ? '' : 'filter'}>{filter}</div>
      )}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  updatePasswordVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  showUpdatePasswordModal: PropTypes.func,
  hideUpdatePasswordModal: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  updatePassword: PropTypes.func,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {};
}

export default injectIntl(connect(mapStateToProps)(Header));
