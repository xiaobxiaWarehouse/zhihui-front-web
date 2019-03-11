import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import { Button, Modal, Form, Row, Col, Input, Spin } from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {TextArea} = Input;

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

const AddModal = (props) => {
  const {
    role,
    onOk,
    form: {
      getFieldDecorator,
      getFieldsValue,
      validateFields,
    },
    ...modalProps
  } = props;

  const {
    editData,
    loading,
  } = role;

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
    role: state.role,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
