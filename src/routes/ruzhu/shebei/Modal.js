import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Button, Modal} from 'antd';

const modal = (props) => {
  const {
    cunrrTabIndex,
    onOk,
    group,
    ...modalProps
  } = props;

  const modalOpts = {
    ...modalProps,
  };

  const text = () => {
    return (
      <div style={{fontSize: '14px', textAlign: 'center', fontWeight: '500'}}>
        <div>您确定解绑当前设备吗?</div>
      </div>);
  };

  return (
    <Modal {...modalOpts} footer={null}>
      {text()}
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <Button style={{marginRight: '10px'}} onClick={() => { onOk(cunrrTabIndex); }} type="primary">确定</Button>
        <Button onClick={() => { modalOpts.onCancel(); }}>取消</Button>
      </div>
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default injectIntl(connect(({group}) => ({group}))(modal));
