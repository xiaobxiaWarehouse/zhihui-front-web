import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import { Button, Modal, Form, Row, Col, Input, Select } from 'antd';
import {Layout} from 'components';
import {manyiduOption} from 'utils';

const CSS = Layout.styles;
const FormItem = Form.Item;
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
    dispatch,
    huodongjilu,
    onOk,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
      validateFields,
    },
    ...modalProps
  } = props;

  const {
    editCanyuJl,
    canyurenList,
  } = huodongjilu;

  const onSubmit = () => {
    validateFields((errors) => {
      const fields = getFieldsValue();
      if (errors) {
        return;
      }
      const {manyidu, suoyin} = fields;
      onOk({
        ...fields,
        manyidu: parseInt(manyidu, 10),
        suoyin: parseInt(suoyin, 10),
      });
    });
  };

  const setSuoyin = (val) => {
    setFieldsValue({
      suoyin: canyurenList.filter((item) => {
        return item.xingming === val;
      })[0].suoyin,
    });
  };

  const text = () => {
    return (
      <Form>
        <Row style={{display: 'none'}}>
          <Col span={21}>
            <FormItem {...formItemLayout} label="记录Index">
              {getFieldDecorator('index', {
                initialValue: editCanyuJl && editCanyuJl.index,
                rules: [],
              })(<Input placeholder="请输入记录Index" />)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{display: 'none'}}>
          <Col span={21}>
            <FormItem {...formItemLayout} label="参与记录ID">
              {getFieldDecorator('id', {
                initialValue: (editCanyuJl && editCanyuJl.id) ? editCanyuJl.id : undefined,
                rules: [],
              })(<Input placeholder="请输入参与记录ID" />)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{display: 'none'}}>
          <Col span={21}>
            <FormItem required {...formItemLayout} label="入住索引">
              {getFieldDecorator('suoyin', {
                initialValue: (editCanyuJl && editCanyuJl.suoyin) ? editCanyuJl.suoyin : undefined,
                rules: [
                  {required: true, message: '请输入入住索引'},
                ],
              })(<Input placeholder="请输入入住索引" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem required {...formItemLayout} label="参与人">
              {getFieldDecorator('canyurenXm', {
                initialValue: (editCanyuJl && editCanyuJl.canyurenXm) || undefined,
                rules: [
                  {required: true, message: '请选择参与人'},
                ],
              })(<Select placeholder="请选择参与人" onChange={(val) => { setSuoyin(val); }}>
                {canyurenList.map((k) => {
                  return <Option key={`${k.suoyin}_${k.xingming}`} value={k.xingming}>{`${k.xingming}-${k.suoyinBh}`}</Option>;
                })}
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="活动满意度">
              {getFieldDecorator('manyidu', {
                initialValue: (editCanyuJl && `${editCanyuJl.manyidu}`) || '1',
                rules: [
                  {required: true, message: '请选择活动满意度'},
                ],
              })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择活动满意度">{manyiduOption.map((k) => {
                return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
              })}</Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('beizhu', {
                initialValue: editCanyuJl && editCanyuJl.beizhu,
                rules: [
                ],
              })(<TextArea rows={3} placeholder="请输入备注" />)}
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
        >确认</Button>
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
    huodongjilu: state.huodongjilu,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AddModal)));
