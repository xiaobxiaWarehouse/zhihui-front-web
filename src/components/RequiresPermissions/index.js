/**
 * Created by alphabeta on 17-12-13.
 */
import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import {classnames} from 'utils';
import {connect} from 'dva/index';
import {injectIntl} from 'react-intl';

const checkPermissionAny = (any, permissions) => {
  const inter = lodash.intersection(any, permissions);
  if (inter && inter.length > 0) {
    return true;
  }
  return false;
};

const checkPermissionAll = (all, permissions) => {
  const inter = lodash.intersection(all, permissions);
  if (inter && inter.length > 0 && inter.length === all.length) {
    return true;
  }
  return false;
};

const RequiresPermissions = (props) => {
  const {
    all,
    any,
    className,
    permissions,
    children,
    ...restProps
  } = props;
  // 去掉重复编码
  const uniqPermissions = lodash.uniq(permissions);
  const cls = classnames(className, 'requires-permissions');
  let child = children;
  // 如果是string类型，使用span包装为react.element
  if (typeof children === 'string') {
    child = <span {...restProps} className={cls}>{children}</span>;
  }
  // 权限优先级，优先匹配all权限
  if (all) {
    // 去掉重复编码
    const uniqAll = lodash.uniq(all instanceof Array ? all : [all]);
    return checkPermissionAll(uniqAll, uniqPermissions) ? child : null;
  }
  if (any) {
    // 去掉重复编码
    const uniqAny = lodash.uniq(any instanceof Array ? any : [any]);
    return checkPermissionAny(uniqAny, uniqPermissions) ? child : null;
  }
  return null;
};

// 支持string或array
RequiresPermissions.propTypes = {
  all: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  any: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  permissions: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default RequiresPermissions;

