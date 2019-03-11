import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import { Button, Modal, Form, Row, Col, Input } from 'antd';
import {Layout} from 'components';

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

const AddModal = (props) => {
  const {
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
    </Modal>
  );
};

AddModal.propTypes = {
  item: PropTypes.object,
  onFilterChange: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    huli: state.huli,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
