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
    yuangong,
    onOk,
    ...modalProps
  } = props;
  const modalOpts = {
    ...modalProps,
  };
  const {
    editData,
  } = yuangong;
  const text = () => {
    if (modalOpts.modalType === 1) {
      return editData && editData.zhuangtai === 1 ? '禁用员工？' : '启用员工？';
    } if (modalOpts.modalType === 2) {
      return '确定重置员工密码？';
    } else {
      return intl.get('Confirm.delete');
    }
  };

  const onOkHandler = () => {
    onOk(editData);
  };

  return (
    <Modal className={CSS.tipsModal} {...modalOpts} onOk={onOkHandler}>
      {text()}
    </Modal>
  );
};

modal.propTypes = {
  onOk: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    yuangong: state.yuangong,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
