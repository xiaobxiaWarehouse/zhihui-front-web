/**
 * Created by alphabeta on 17-12-13.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {classnames} from 'utils';
import {connect} from 'dva/index';
import {injectIntl} from 'react-intl';
import RequiresPermissions from '../RequiresPermissions';

const Permissions = (props) => {
  const {
    app,
    ...restProps
  } = props;
  // 获取用户权限
  const {permissions} = app;

  return <RequiresPermissions permissions={permissions} {...restProps}/>;
};

// 支持string或array
Permissions.propTypes = {
  all: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  any: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default injectIntl(connect(({app}) => ({app}))(Permissions));

