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
    onOk,
    ...modalProps
  } = props;
  const modalOpts = {
    ...modalProps,
  };

  const onOkHandler = () => {
    onOk();
  };

  return (
    <Modal className={CSS.tipsModal} {...modalOpts} onOk={onOkHandler}>
      <div>您确定退出登录？</div>
    </Modal>
  );
};

modal.propTypes = {
  onOk: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(modal));
