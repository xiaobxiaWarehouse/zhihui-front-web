import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import { Button, Modal, Form, Row, Col, Input, Select, Spin } from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;
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

const AddModal = (props) => {
  const {
    chuangwei,
    app,
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
  } = chuangwei;

  const {
    user,
  } = app;

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
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
                initialValue: user && user.email,
                rules: [
                  {required: true, message: '请输入邮箱'},
                ],
              })(<Input placeholder="请输入邮箱" />)}
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
          >下载</Button>
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
    chuangwei: state.chuangwei,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
