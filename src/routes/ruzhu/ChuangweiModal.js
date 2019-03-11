import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Button, Modal, Form, Row, Col, Input, DatePicker } from 'antd';
import {Layout} from 'components';
import styles from './index.less';
import Chuangwei from './chuangwei';

const CSS = Layout.styles;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
  style: {
  },
};

const modal = (props) => {
  const {
    filter,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    },
    screen,
    suoyin,
    ...modalProps
  } = props;

  const chuangweiProps = {
    screen,
    suoyin,
  };

  return (
    <Modal className={CSS.chuangweiModal} {...modalProps} footer={null}>
      <Chuangwei {...chuangweiProps} />
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(modal)));
