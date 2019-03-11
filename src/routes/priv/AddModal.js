import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Button, Modal, Form, Row, Col, Input, Select, Radio, Spin } from 'antd';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;
const {Option} = Select;

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

const radioOption = [
  {id: 1, value: '未护理'},
  {id: -1, value: '全部'},
];

const AddModal = (props) => {
  const {
    priv,
    onOk,
    filter,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
      validateFields,
    },
    ...modalProps
  } = props;

  const {
    editData,
    loading,
  } = priv;

  const onSubmit = () => {
    validateFields((errors) => {
      const fields = getFieldsValue();
      if (errors) {
        return;
      }
      onOk(fields);
    });
  };

  const text = () => {
    return (
      <Form>
        <Row style={{display: 'none'}}>
          <Col span={21}>
            <FormItem {...formItemLayout} label="角色ID">
              {getFieldDecorator('id', {
                initialValue: editData && editData.id,
                rules: [],
              })(<Input placeholder="请输入角色ID" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="角色名">
              {getFieldDecorator('name', {
                initialValue: editData && editData.name,
                rules: [
                  {required: true, message: '请输入角色名'},
                ],
              })(<Input placeholder="请输入角色名" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="角色编码">
              {getFieldDecorator('code', {
                initialValue: editData && editData.code,
                rules: [
                  {required: true, message: '请输入角色编码'},
                ],
              })(<Input placeholder="请输入角色编码" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="角色描述">
              {getFieldDecorator('description', {
                initialValue: editData && editData.description,
                rules: [
                  {required: true, message: '请输入角色描述'},
                ],
              })(<TextArea rows={3} placeholder="请输入角色描述" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Modal className={CSS.addModal} {...modalProps} footer={null}>
      <Spin spinning={loading}>
        {text()}
        <div style={{marginTop: 10}} className={CSS.buttonBox}>
          <Button
            className={CSS.searchBtn}
            onClick={() => {
              onSubmit();
            }}
            type="primary"
          >确认</Button>
        </div>
      </Spin>
    </Modal>
  );
};

AddModal.propTypes = {
  item: PropTypes.object,
  onFilterChange: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    priv: state.priv,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
