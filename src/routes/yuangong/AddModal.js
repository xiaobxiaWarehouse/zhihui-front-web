import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Button, Modal, Form, Row, Col, Input, Select, Radio, Spin, Checkbox, message } from 'antd';
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

const AddModal = (props) => {
  const {
    yuangong,
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
    allGangwei,
    roleList,
  } = yuangong;

  const onSubmit = () => {
    validateFields((errors) => {
      const fields = getFieldsValue();
      if (errors) {
        return;
      }
      onOk(fields);
    });
  };
  let roleArray = [];
  if (editData && editData.roles) {
    roleArray = editData.roles.map((item) => {
      return item.id;
    });
  }
  const text = () => {
    return (
      <Form>
        <Row style={{display: 'none'}}>
          <Col span={21}>
            <FormItem {...formItemLayout} label="员工ID">
              {getFieldDecorator('id', {
                initialValue: editData && editData.id,
                rules: [],
              })(<Input placeholder="请输入员工ID" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="员工工号">
              {getFieldDecorator('gonghao', {
                initialValue: editData && editData.gonghao,
                rules: [
                  {required: true, message: '请输入员工工号'},
                ],
              })(<Input placeholder="请输入员工工号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="员工姓名">
              {getFieldDecorator('xingming', {
                initialValue: editData && editData.xingming,
                rules: [
                  {required: true, message: '请输入员工姓名'},
                ],
              })(<Input placeholder="请输入员工姓名" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="手机号码">
              {getFieldDecorator('shouji', {
                initialValue: editData && editData.shouji,
                rules: [
                  {required: true, message: '请输入手机号码'},
                ],
              })(<Input disabled={editData && editData.length > 0} placeholder="请输入手机号码" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="岗位">
              {getFieldDecorator('gangwei', {
                initialValue: editData && editData.gangwei,
                rules: [],
              })(<Input placeholder="请输入岗位"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="角色">
              {getFieldDecorator('roles', {
                initialValue: roleArray,
                rules: [
                 { required: true, message: '请选择角色'},
                ],
              })(<Select allowClear mode="multiple" getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择角色">
                {
                  roleList.map((item) => {
                    return <Option style={{fontSize: 15}} key={item.id} value={Number(item.id)}>{item.name}</Option>;
                  })
                }
              </Select>)}
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
    yuangong: state.yuangong,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
