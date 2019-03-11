import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { queryArray, getMenuPath } from 'utils';
import {Icon as JXRSIcon} from '../JXRS';
import styles from './Bread.less';

const Bread = ({ menu, location }) => {
  // 匹配当前路由
  let pathArray = [];
  let current;
  current = getMenuPath(menu, location.pathname);

  const getPathArray = (item) => {
    pathArray.unshift(item);
    if (item.parent && item.parent.id !== null && item.parent.id !== undefined) {
      getPathArray(item.parent);
    }
  };
  if (!current) {
    pathArray.push({
      id: 1,
      icon: 'laptop',
      name: 'Dashboard',
    });
    pathArray.push({
      id: 404,
      name: 'Not Found',
    });
  } else {
    getPathArray(current);
  }
  // 递归查找父级
  const breads = pathArray.map((item, index) => {
    const content = (
      <span>{item.icon ? <JXRSIcon type={item.icon} style={{ marginRight: 4, fontSize: 12 }}/> : ''}{(item.intl && intl.get(item.intl)) || item.name}</span>
    );
    return (
      <Breadcrumb.Item key={item.name}>
        {((pathArray.length - 1) !== index) ? <Link to={item.route}>{content}</Link> : content}
      </Breadcrumb.Item>
    );
  });
  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  );
};

Bread.propTypes = {
  menu: PropTypes.array,
  location: PropTypes.object,
};

export default injectIntl(Bread);
