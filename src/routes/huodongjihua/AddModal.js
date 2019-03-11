import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import { Button, Modal, Form, Row, Col, Input, Select, Radio, DatePicker, Spin } from 'antd';
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

const zhuangtaiOption = [
  {zhi: 1, zhongwen: '有效'},
  {zhi: 2, zhongwen: '无效'},
];

const AddModal = (props) => {
  const {
    huodongjihua,
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
    loading,
  } = huodongjihua;

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
            <FormItem {...formItemLayout} label="活动项目">
              {getFieldDecorator('xiangmu', {
                rules: [
                  {required: true, message: '请输入活动项目'},
                ],
              })(<Input placeholder="请输入活动项目" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="活动名称">
              {getFieldDecorator('mingcheng', {
                rules: [
                  {required: true, message: '请输入活动名称'},
                ],
              })(<Input placeholder="请输入活动名称" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="活动时间">
              {getFieldDecorator('shijian', {
                rules: [
                  {required: true, message: '请输入活动时间'},
                ],
              })(<Input placeholder="请输入活动时间" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="活动内容">
              {getFieldDecorator('neirong', {
                rules: [
                  {required: true, message: '请输入活动内容'},
                ],
              })(<TextArea rows={3} placeholder="请输入活动内容" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('zhuangtai', {
                initialValue: '1',
                rules: [
                  {required: true, message: '请选择状态'},
                ],
              })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择状态">{zhuangtaiOption.map((k) => {
                return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
              })}</Select>)}
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
    huodongjihua: state.huodongjihua,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
