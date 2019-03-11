import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { Button, Modal, Form, Row, Col, Input } from 'antd';
import { Layout } from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
  style: {},
};

const modal = (props) => {
  const {
    onOk,
    form: { getFieldDecorator, getFieldsValue, setFieldsValue },
    ...modalProps
  } = props;

  const add = () => {
    const fields = getFieldsValue();
    setFieldsValue({
      '01': undefined,
      '02': undefined,
      '03': undefined,
      '04': undefined,
    });
    onOk(fields);
  };

  const text = () => {
    return (
      <Form>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="与休养员关系">
              {getFieldDecorator('01', {
                rules: [],
              })(<Input placeholder="请输入与休养员关系" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('02', {
                rules: [],
              })(<Input placeholder="请输入姓名" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="工作单位">
              {getFieldDecorator('03', {
                rules: [],
              })(<Input placeholder="请输入工作单位" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="联系方式">
              {getFieldDecorator('04', {
                rules: [],
              })(<Input placeholder="请输入联系方式" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Modal className={CSS.addModal} {...modalProps} footer={null}>
      {text()}
      <div style={{ marginTop: 10 }} className={CSS.buttonBox}>
        <Button
          className={CSS.searchBtn}
          onClick={() => {
            add();
          }}
          type="primary"
        >
          确认
        </Button>
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

export default injectIntl(connect(mapStateToProps)(Form.create()(modal)));
