import React from 'react';
import { connect } from 'dva';
import { Col, Form, Input, Row, InputNumber, Radio, Tag} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
  style: {
  },
};

const Zhxmorenyuzhi = (props) => {
  const {
    form: {
      getFieldDecorator,
    },
    ruyuan: {
      zhxData,
    },
  } = props;

  return (
    <div className="content-inner-gray">
      <Row className="pgTitle">
        <Col span={6}>
          <Tag className="titleName">设备信息</Tag>
        </Col>
      </Row>
      <Row className="inputTitle">
        <Col span={24}>
          <FormItem {...formItemLayout} label="设备号">
            {getFieldDecorator('bianhao', {
              initialValue: zhxData ? zhxData.bianhao : undefined,
              rules: [
                {required: true, message: '请输入设备号'},
              ],
            })(<Input disabled placeholder="请输入设备号"/>)}
          </FormItem>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    ruyuan: state.ruyuan,
  };
}
export default connect(mapStateToProps)(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
    } = props;
    dispatch({
      type: 'ruyuan/updataAllvalues',
      payload: allValues,
    });
  },
})(Zhxmorenyuzhi));
