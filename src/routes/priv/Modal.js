import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {Button, Modal} from 'antd';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;

const modal = (props) => {
  const {
    currentItem = {},
    onOk,
    ...modalProps
  } = props;
  const modalOpts = {
    ...modalProps,
  };
  const text = () => {
    if (modalOpts.modalType === 1) {
      return currentItem.zhuangtai === 1 ? '禁用员工？' : '启用员工？';
    }
  };

  const onOkHandler = () => {
    onOk(currentItem);
  };

  return (
    <Modal className={CSS.tipsModal} {...modalOpts} onOk={onOkHandler}>
      {text()}
    </Modal>
  );
};

modal.propTypes = {
  currentItem: PropTypes.object,
  onOk: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    currentItem: state.priv.currentItem,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
