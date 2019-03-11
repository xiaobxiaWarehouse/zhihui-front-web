import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Button, Modal, Form, Row, Col, Input, Select, Radio, Spin } from 'antd';
import {Layout} from 'components';

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

const allChuangwei = [
  { zhi: 1, zhongwen: '空' },
  // { zhi: 2, zhongwen: '已预定' },
  // { zhi: 3, zhongwen: '已申请' },
  // { zhi: 4, zhongwen: '已入住' },
  { zhi: 5, zhongwen: '不可用' },
];

const chuangweileixing = [
  {id: 1, name: '动态床位'},
  {id: 2, name: '固定床位'},
];

const AddModal = (props) => {
  const {
    chuangwei,
    onOk,
    form: {
      getFieldDecorator,
      getFieldsValue,
      validateFields,
      setFieldsValue,
    },
    ...modalProps
  } = props;

  const {
    editData,
    loading,
  } = chuangwei;

  const onSubmit = () => {
    validateFields((errors) => {
      const fields = getFieldsValue();
      if (errors) {
        return;
      }
      onOk(fields);
    });
  };

  const changeInput = (e) => {
    const {
      target,
    } = e;
    const {value} = target;
    if (value) {
      setFieldsValue({
        fanghao: value.trim(),
      });
    }
  };
  const text = () => {
    return (
      <Form>
        <Row style={{display: 'none'}}>
          <Col span={21}>
            <FormItem {...formItemLayout} label="床位ID">
              {getFieldDecorator('id', {
                initialValue: editData && editData.id,
                rules: [],
              })(<Input placeholder="请输入床位ID" />)}
            </FormItem>
          </Col>
        </Row>
        {/* <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="床位编号">
              {getFieldDecorator('bianhao', {
                initialValue: editData && editData.bianhao,
                rules: [
                  {required: true, message: '请输入床位编号'},
                ],
                getValueFromEvent: e => e.target.value.trim(),
              })(<Input placeholder="请输入床位编号" />)}
            </FormItem>
          </Col>
        </Row> */}
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="楼号">
              {getFieldDecorator('louhao', {
                initialValue: editData && editData.louhao,
                rules: [
                  {required: true, message: '请输入楼号'},
                ],
                getValueFromEvent: e => e.target.value.trim(),
              })(<Input placeholder="请输入楼号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="楼层">
              {getFieldDecorator('louceng', {
                initialValue: editData && editData.louceng,
                rules: [
                  {required: true, message: '请输入楼层'},
                ],
                getValueFromEvent: e => e.target.value.trim(),
              })(<Input placeholder="请输入楼层" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="房号">
              {getFieldDecorator('fanghao', {
                initialValue: editData && editData.fanghao,
                rules: [
                  {required: true, message: '请输入房号'},
                ],
                getValueFromEvent: e => e.target.value.trim(),
              })(<Input placeholder="请输入房号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="床号">
              {getFieldDecorator('chuanghao', {
                initialValue: editData && editData.chuanghao,
                rules: [
                  {required: true, message: '请输入床号'},
                ],
                getValueFromEvent: e => e.target.value.trim(),
              })(<Input placeholder="请输入床号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="床位状态">
              {getFieldDecorator('zhuangtai', {
                initialValue: (editData && `${editData.zhuangtai}`) || '1',
                rules: [
                  {required: true, message: '请选择床位状态'},
                ],
              })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择床位状态">{allChuangwei.map((k) => {
                return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
              })}</Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="床位类型">
              {getFieldDecorator('leixing', {
                initialValue: (editData && `${editData.leixing}`) || '2',
                rules: [
                  {required: true, message: '请选择床位类型'},
                ],
              })(<Select disabled getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择床位类型">{chuangweileixing.map((k) => {
                return <Option key={k.id} value={String(k.id)}>{k.name}</Option>;
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
    chuangwei: state.chuangwei,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
