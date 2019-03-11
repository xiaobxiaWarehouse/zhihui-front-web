/**
 * Created by alphabeta on 17-12-13.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {classnames} from 'utils';
import '../../../assets/iconfont/css/iconfont.scss';

const Icon = (props) => {
  const {
    type,
    className,
    size = 'md',
    ...restProps
  } = props;
  const cls = classnames(className, 'jxrs-icon', `jxrs-icon-${type}`, `jxrs-icon-${size}`);
  return (
    <i {...restProps} className={cls}/>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
