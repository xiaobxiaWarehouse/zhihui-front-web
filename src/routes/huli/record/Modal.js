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
    huli,
    onOk,
    ...modalProps
  } = props;
  const modalOpts = {
    ...modalProps,
  };
  const {
    editRecord,
  } = huli;
  const text = () => {
    if (modalOpts.modalType === 2) {
      return intl.get('Confirm.delete');
    }
  };

  const onOkHandler = () => {
    onOk(editRecord);
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
    huli: state.huli,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
