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
    huodongjihua,
    onOk,
    ...modalProps
  } = props;

  const {
    editData,
  } = huodongjihua;

  const modalOpts = {
    ...modalProps,
  };
  const text = () => {
    if (modalOpts.modalType === 1) {
      return editData && editData.zhuangtai === 1 ? '将活动计划设为无效？' : '将活动计划设为有效？';
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
    huodongjihua: state.huodongjihua,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
