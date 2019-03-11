import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Button, Modal, Form, Row, Col, Input, DatePicker } from 'antd';
import {getOption} from 'utils';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 15,
  },
  style: {
  },
};

const modal = (props) => {
  const {
    item,
    onCancelSuoyin,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    },
    app: {
      allXingbie,
    },
    ...modalProps
  } = props;

  const text = () => {
    return (
      <Form>
        <FormItem {...formItemLayout} label="休养员姓名">
          {item.xingming || '-'}
        </FormItem>
        <FormItem {...formItemLayout} label="性别">
          {getOption(item.xingbie, allXingbie) || '-'}
        </FormItem>
        <FormItem {...formItemLayout} label="年龄">
          {item.nianling || '-'}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证">
          {item.shenfenzheng || '-'}
        </FormItem>
        <FormItem {...formItemLayout} label="联系人姓名">
          {item.lianxirenXm || '-'}
        </FormItem>
        <FormItem {...formItemLayout} label="联系人电话">
          {item.lianxirenDh || '-'}
        </FormItem>
      </Form>
    );
  };

  return (
    <Modal className={CSS.searchModal} {...modalProps} footer={null}>
      {text()}
      <div className={CSS.buttonBox}>
        <Button
          className={CSS.resetBtn}
          onClick={() => {
            onCancelSuoyin();
          }}
          type="primary"
        >取消关联</Button>
        <Button
          className={CSS.searchBtn}
          onClick={() => {
            modalProps.onCancel();
          }}
          type="primary"
        >确定</Button>
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
    yuyue: state.yuyue,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(modal)));
