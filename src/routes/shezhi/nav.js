import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import intl from 'react-intl-universal';
import { JXRS } from 'components';
import { getMenuPath } from 'utils';
import { Link } from 'dva/router';
import { Menu } from 'antd';
import styles from './index.less';

const JXRSIcon = JXRS.Icon;
const { SubMenu } = Menu;

const Nav = (props) => {
  const { menu, location } = props;
  // 生成树状
  const menuTree = menu;
  const levelMap = {};
  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN) => {
    return menuTreeN.map((item) => {
      if (item.children && item.children.length > 0) {
        if (
          item.parent &&
          item.parent.id !== null &&
          item.parent.id !== undefined
        ) {
          levelMap[item.id] = item.parent.id;
        }
        return (
          <SubMenu
            key={item.url}
            title={
              <span>
                {item.icon && (
                  <JXRSIcon type={item.icon} className="icon-menu" />
                )}
                {(!siderFoldN || !menuTree.includes(item)) &&
                  ((item.intl && intl.get(item.intl)) ||
                    item.label ||
                    item.name)}
              </span>
            }
          >
            {getMenus(item.children, siderFoldN)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={item.url}>
          <Link to={`${item.path}?forceRefresh=true`}>
            {item.icon && <JXRSIcon type={item.icon} className="icon-menu" />}
            {(!siderFoldN || !menuTree.includes(item)) &&
              ((item.intl && intl.get(item.intl)) || item.label || item.name)}
          </Link>
        </Menu.Item>
      );
    });
  };
  const menuItems = getMenus(menuTree, false);

  return (
    <div className={styles.menu}>
      <Menu
        style={{ width: '100%', paddingTop: 13 }}
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        {menuItems}
      </Menu>
    </div>
  );
};

Nav.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    shezhi: state.shezhi,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Nav));
