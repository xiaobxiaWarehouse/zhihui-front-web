import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Modal} from 'antd';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {Layout} from 'components';

const CSS = Layout.styles;

const modal = (props) => {
  const {
    chuangwei,
    onOk,
    ...modalProps
  } = props;
  const modalOpts = {
    ...modalProps,
  };
  const {
    editData,
  } = chuangwei;
  const text = () => {
    if (modalOpts.modalType === 1) {
      return editData && editData.zhuangtai === 1 ? '禁用床位？' : '启用床位？';
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
    chuangwei: state.chuangwei,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
