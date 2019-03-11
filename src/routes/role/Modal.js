import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import intl from 'react-intl-universal';
import { Modal } from 'antd';
import { Layout } from 'components';

const CSS = Layout.styles;

const modal = (props) => {
  const { role, onOk, ...modalProps } = props;
  const modalOpts = {
    ...modalProps,
  };
  const { editData, itemId } = role;
  const text = () => {
    if (modalOpts.modalType === 1) {
      return editData && editData.zhuangtai === 1 ? '禁用角色？' : '启用角色？';
    } else {
      return intl.get('Confirm.delete');
    }
  };

  const onOkHandler = () => {
    onOk(itemId);
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
    role: state.role,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
