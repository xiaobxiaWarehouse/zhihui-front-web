import React from 'react';
import { connect } from 'dva';
import { Col, Form, Input, Row, InputNumber, Radio, Tag} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
const formItemLayout1 = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
  style: {
  },
};

const Dtzmorenyuzhi = (props) => {
  const {
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    },
    app: {
      viewJigou,
    },
    ruyuan: {
      dtzData,
    },
  } = props;

  const onChangeTixing = (val) => {
    const {target: {value}} = val;
    if (value === 1) {
      setFieldsValue({
        moren: undefined,
      });
    } else {
      setFieldsValue({
        moren: 2,
      });
    }
  };

  const onChangeYuzhi = (val) => {
    const {target: {value}} = val;
    if (value === 1) {
      const {yuzhiDuotizheng} = viewJigou;
      setFieldsValue({
        hrmin: yuzhiDuotizheng ? yuzhiDuotizheng.hr.min : undefined,
        hrmax: yuzhiDuotizheng ? yuzhiDuotizheng.hr.max : undefined,
        sbpmin: yuzhiDuotizheng ? yuzhiDuotizheng.sbp.min : undefined,
        sbpmax: yuzhiDuotizheng ? yuzhiDuotizheng.sbp.max : undefined,
        dbpmin: yuzhiDuotizheng ? yuzhiDuotizheng.dbp.min : undefined,
        dbpmax: yuzhiDuotizheng ? yuzhiDuotizheng.dbp.max : undefined,
        tempmin: yuzhiDuotizheng ? yuzhiDuotizheng.temp.min : undefined,
        tempmax: yuzhiDuotizheng ? yuzhiDuotizheng.temp.max : undefined,
        bgmin: yuzhiDuotizheng ? yuzhiDuotizheng.bg.min : undefined,
        bgmax: yuzhiDuotizheng ? yuzhiDuotizheng.bg.max : undefined,
        spo2min: yuzhiDuotizheng ? yuzhiDuotizheng.spo2.min : undefined,
        spo2max: yuzhiDuotizheng ? yuzhiDuotizheng.spo2.max : undefined,
      });
    } else {
      setFieldsValue({
        hrmin: undefined,
        hrmax: undefined,
        sbpmin: undefined,
        sbpmax: undefined,
        dbpmin: undefined,
        dbpmax: undefined,
        tempmin: undefined,
        tempmax: undefined,
        bgmin: undefined,
        bgmax: undefined,
        spo2min: undefined,
        spo2max: undefined,
      });
    }
  };

  let yuzhi = null;
  if (dtzData && dtzData.yuzhi) {
    yuzhi = JSON.parse(dtzData.yuzhi);
  }
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
              initialValue: dtzData ? dtzData.bianhao : undefined,
              rules: [
                {required: true, message: '请输入设备号'},
              ],
            })(<Input disabled placeholder="请输入设备号"/>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="提醒设置">
            {getFieldDecorator('tixing', {
              initialValue: dtzData ? dtzData.tixing : undefined,
              rules: [
                  {required: true, message: '请选择提醒设置'},
                ],
            })(<RadioGroup disabled onChange={(val) => { onChangeTixing(val); }}>
              <Radio value={0}>不提醒</Radio>
              <Radio value={1} style={{marginLeft: 20}}>缺省阈值</Radio>
              <Radio value={2} style={{marginLeft: 20}}>⾃定义阈值</Radio>
              <Radio value={3}>⾃适应阈值</Radio>
            </RadioGroup>)}
          </FormItem>
        </Col>
      </Row>
      {
        getFieldsValue().tixing !== 0 && getFieldsValue().tixing !== 3 && <div>
          <Row className="pgTitle">
            <Col span={6}>
              <Tag className="titleName">多体征设备阈值设置</Tag>
            </Col>
          </Row>
          <Row className="inputTitle">
            <Col span={24}>
              <FormItem className="shebei-bottom" {...formItemLayout1} label="心率范围">
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('hrmin', {
                      initialValue: yuzhi ? yuzhi.hr.min : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={5}>
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>次/分</span>
                    <span style={{ display: 'inline-block', float: 'right', marginRight: '5px'}}>-</span>
                  </span>
                </Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('hrmax', {
                      initialValue: yuzhi ? yuzhi.hr.max : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={4} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>次/分</span>
                  </span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem className="shebei-bottom" {...formItemLayout1} label="收缩压范围">
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('sbpmin', {
                      initialValue: yuzhi ? yuzhi.sbp.min : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={5} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>mmHg</span>
                    <span style={{ display: 'inline-block', float: 'right', marginRight: '5px'}}>-</span>
                  </span>
                </Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('sbpmax', {
                      initialValue: yuzhi ? yuzhi.sbp.max : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={4} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>mmHg</span>
                  </span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem className="shebei-bottom" {...formItemLayout1} label="舒张压范围">
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('dbpmin', {
                      initialValue: yuzhi ? yuzhi.dbp.min : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={5} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>mmHg</span>
                    <span style={{ display: 'inline-block', float: 'right', marginRight: '5px'}}>-</span>
                  </span>
                </Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('dbpmax', {
                      initialValue: yuzhi ? yuzhi.dbp.max : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={4} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>mmHg</span>
                  </span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem className="shebei-bottom" {...formItemLayout1} label="体温范围">
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('tempmin', {
                      initialValue: yuzhi ? yuzhi.temp.min : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={5} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>°C</span>
                    <span style={{ display: 'inline-block', float: 'right', marginRight: '5px'}}>-</span>
                  </span>
                </Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('tempmax', {
                      initialValue: yuzhi ? yuzhi.temp.max : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={4} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>°C</span>
                  </span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem className="shebei-bottom" {...formItemLayout1} label="血糖范围">
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('bgmin', {
                      initialValue: yuzhi ? yuzhi.bg.min : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={5} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>mmol/L</span>
                    <span style={{ display: 'inline-block', float: 'right', marginRight: '5px'}}>-</span>
                  </span>
                </Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('bgmax', {
                      initialValue: yuzhi ? yuzhi.bg.max : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={4} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>mmol/L</span>
                  </span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem className="shebei-bottom" {...formItemLayout1} label="血氧范围">
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('spo2min', {
                      initialValue: yuzhi ? yuzhi.spo2.min : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={5} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>%</span>
                    <span style={{ display: 'inline-block', float: 'right', marginRight: '5px'}}>-</span>
                  </span>
                </Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('spo2max', {
                      initialValue: yuzhi ? yuzhi.spo2.max : undefined,
                      rules: [],
                    })(<InputNumber min={1} style={{width: '100%'}}/>)}
                  </FormItem>
                </Col>
                <Col span={4} >
                  <span style={{ display: 'inline-block', width: '100%' }}>
                    <span style={{ display: 'inline-block', float: 'left', marginLeft: '5px'}}>%</span>
                  </span>
                </Col>
              </FormItem>
            </Col>
          </Row>
        </div>
      }
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
})(Dtzmorenyuzhi));
