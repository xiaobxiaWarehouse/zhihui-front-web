import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import { Button, Modal, Form } from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;


const modal = (props) => {
  const {
    ...modalProps
  } = props;


  const text = () => {
    return <div style={{textAlign: 'center'}}>您确定同步数据？</div>;
  };

  return (
    <Modal {...modalProps} footer={null}>
      {text()}
      <div className={CSS.buttonBox}>
        <Button
          onClick={() => {
            modalProps.onOk();
          }}
          type="primary"
        >确认</Button>
        <Button
          onClick={() => {
            modalProps.onCancel();
          }}
        >取消</Button>
      </div>
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
  onFilterChange: PropTypes.func,
};


function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      ruyuan: {
        filterValue,
      },
    } = props;
    let params = {
      ...allValues,
    };
    if (params.yujiSj) {
      params.yujiSj = params.yujiSj.format('YYYYMMDD');
    }
    dispatch({
      type: 'ruyuan/updataFilterValue',
      payload: {
        ...filterValue,
        ...params,
      },
    });
  },
})(modal)));
