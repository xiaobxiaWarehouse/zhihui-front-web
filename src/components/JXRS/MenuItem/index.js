/**
 * Created by alphabeta on 17-12-13.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {classnames} from 'utils';
import '../../../assets/iconfont/css/iconfont.scss';

const MenuItem = (props) => {
  const {
    type,
    className,
    size = 'md',
    label,
    handleClick,
    item,
    ...restProps
  } = props;

  const cls = classnames(className, 'menuitem', `menuitem-${type}`, `menuitem-${size}`);
  return (
    <div {...restProps} className={cls} onClick={() => { handleClick(item); }}>
      <div className="icon"/>
      <div className="label">{label}</div>
    </div>
  );
};

MenuItem.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

export default MenuItem;
