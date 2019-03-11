import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import { Modal, Form } from 'antd';
import {Layout} from 'components';
import {config} from 'utils';
import styles from './index.less';

const CSS = Layout.styles;
const {PROJECT} = config;

const modal = (props) => {
  const {
    currentImg,
    ...modalProps
  } = props;

  const text = () => {
    return (<div
      style={{
        width: 720,
        minHeight: 720,
        display: 'flex',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={`${PROJECT}/oss/${currentImg}?x-oss-process=image/resize,m_mfit,w_720,h_500/auto-orient,1`} alt=""/>
    </div>);
  };

  return (
    <Modal className={CSS.viewFullModal} {...modalProps} footer={null}>
      {text()}
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    huodongjilu: state.huodongjilu,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(modal)));
