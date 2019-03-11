import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import intl from 'react-intl-universal';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import { getMenuPath } from 'utils';
import { Icon as JXRSIcon } from '../JXRS';

const { SubMenu } = Menu;

const Menus = (props) => {
  const {
    siderFold,
    darkTheme,
    handleClickNavMenu,
    navOpenKeys,
    changeOpenKeys,
    menu,
    location,
  } = props;
  // 生成树状
  const menuTree = [];
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
            key={item.id}
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
      if (item.sideMenu) {
        return (
          <Menu.Item key={item.id}>
            <Link to={item.path}>
              {item.icon && <JXRSIcon type={item.icon} className="icon-menu" />}
              {(!siderFoldN || !menuTree.includes(item)) &&
                ((item.intl && intl.get(item.intl)) || item.label || item.name)}
            </Link>
          </Menu.Item>
        );
      }
      return null;
    });
  };
  const menuItems = getMenus(menuTree, siderFold);
  // 保持选中
  const getAncestorKeys = (key) => {
    let map = {};
    const getParent = (index) => {
      const result = [String(levelMap[index])];
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0]);
      }
      return result;
    };
    for (let index in levelMap) {
      if ({}.hasOwnProperty.call(levelMap, index)) {
        map[index] = getParent(index);
      }
    }
    return map[key] || [];
  };

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key));
    const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  };

  let menuProps = !siderFold
    ? {
      onOpenChange,
      openKeys: navOpenKeys,
    }
    : {};

  // 寻找选中路由
  let pathArray = [];
  let currentMenu;
  let defaultSelectedKeys;
  currentMenu = getMenuPath(menu, location.pathname);

  const getPathArray = (item) => {
    pathArray.unshift(item);
    if (
      item.parent &&
      item.parent.id !== null &&
      item.parent.id !== undefined
    ) {
      getPathArray(item.parent);
    }
  };
  if (currentMenu) {
    getPathArray(currentMenu);
    defaultSelectedKeys = pathArray.map(item => `${item.id}`);
  }

  if (!defaultSelectedKeys) {
    defaultSelectedKeys = ['1'];
  }

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={defaultSelectedKeys}
    >
      {menuItems}
    </Menu>
  );
};

Menus.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  handleClickNavMenu: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  location: PropTypes.object,
};

export default injectIntl(Menus);
