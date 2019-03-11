import React from 'react';
import { connect } from 'dva';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import { Col, Form, Input, Row, InputNumber, Radio, Tag, Button} from 'antd';
import moment from 'moment';

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
const formItemLayout2 = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
  style: {
  },
};
const formItemLayout3 = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
  style: {
  },
};
class Zncmorenyuzhi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hrStartTime: null,
      hrEndTime: null,
      rrStartTime: null,
      rrEndTime: null,
      bedStartTime: null,
      bedEndTime: null,
    };
  }

  componentWillReceiveProps(newProps) {
    const {app} = this.props;
    const {viewJigou} = app;
    if (this.state.hrStartTime === null && this.state.hrEndTime === null && newProps.app && newProps.app.viewJigou && newProps.app.viewJigou.yuzhiChuang && newProps.app.viewJigou.yuzhiChuang.hr.start && newProps.app.viewJigou.yuzhiChuang.hr.end) {
      this.setState({
        hrStartTime: moment(newProps.app.viewJigou.yuzhiChuang.hr.start, 'HH:mm:ss').toDate(),
        hrEndTime: moment(newProps.app.viewJigou.yuzhiChuang.hr.end, 'HH:mm:ss').toDate(),
      });
    } else if (this.state.rrStartTime === null && this.state.rrEndTime === null && newProps.app && newProps.app.viewJigou && newProps.app.viewJigou.yuzhiChuang && newProps.app.viewJigou.yuzhiChuang.rr.start && newProps.app.viewJigou.yuzhiChuang.rr.end) {
      this.setState({
        rrStartTime: moment(newProps.app.viewJigou.yuzhiChuang.rr.start, 'HH:mm:ss').toDate(),
        rrEndTime: moment(newProps.app.viewJigou.yuzhiChuang.rr.end, 'HH:mm:ss').toDate(),
      });
    } else if (this.state.bedStartTime === null && this.state.bedEndTime === null && newProps.app && newProps.app.viewJigou && newProps.app.viewJigou.yuzhiChuang && newProps.app.viewJigou.yuzhiChuang.bed.start && newProps.app.viewJigou.yuzhiChuang.bed.end) {
      this.setState({
        bedStartTime: moment(newProps.app.viewJigou.yuzhiChuang.bed.start, 'HH:mm:ss').toDate(),
        bedEndTime: moment(newProps.app.viewJigou.yuzhiChuang.bed.end, 'HH:mm:ss').toDate(),
      });
    }
  }

  render() {
    const {
      ruyuan,
      location,
      form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
      },
      app: {
        viewJigou,
      },
      dispatch,
    } = this.props;
    const { morenzhi } = ruyuan;
    const onChangeTixing = (val) => {
      const {target: {value}} = val;
      if (value === 1 || value === 2) {
        const {yuzhiChuang} = viewJigou;
        this.setState(
          {
            hrStartTime: yuzhiChuang && moment(yuzhiChuang.hr.start, 'HH:mm:ss').toDate(),
            hrEndTime: yuzhiChuang && moment(yuzhiChuang.hr.end, 'HH:mm:ss').toDate(),
            rrStartTime: yuzhiChuang && moment(yuzhiChuang.rr.start, 'HH:mm:ss').toDate(),
            rrEndTime: yuzhiChuang && moment(yuzhiChuang.rr.end, 'HH:mm:ss').toDate(),
            bedStartTime: yuzhiChuang && moment(yuzhiChuang.bed.start, 'HH:mm:ss').toDate(),
            bedEndTime: yuzhiChuang && moment(yuzhiChuang.bed.end, 'HH:mm:ss').toDate(),
          },
          () => {
            setFieldsValue({
              hrmin: yuzhiChuang ? yuzhiChuang.hr.min : undefined,
              hrmax: yuzhiChuang ? yuzhiChuang.hr.max : undefined,
              rrmin: yuzhiChuang ? yuzhiChuang.rr.min : undefined,
              rrmax: yuzhiChuang ? yuzhiChuang.rr.max : undefined,
              onbed: yuzhiChuang ? yuzhiChuang.bed.onbed : undefined,
              offbed: yuzhiChuang ? yuzhiChuang.bed.offbed : undefined,
              hrStart: this.state.hrStartTime,
              hrEnd: this.state.hrEndTime,
              rrStart: this.state.rrStartTime,
              rrEnd: this.state.rrEndTime,
              bedStart: this.state.bedStartTime,
              bedEnd: this.state.bedEndTime,
              hrduration: yuzhiChuang ? yuzhiChuang.hr.duration : undefined,
              rrduration: yuzhiChuang ? yuzhiChuang.rr.duration : undefined,
            });
          },
        );
      }
    };

    let yuzhi = null;
    if (morenzhi && morenzhi.yuzhi) {
      yuzhi = JSON.parse(morenzhi.yuzhi);
    }

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        mode="time"
        defaultDate={this.state.hrStartTime ? moment(this.state.hrStartTime, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
      />
    );
    const datePicker2 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        mode="time"
        defaultDate={this.state.hrEndTime ? moment(this.state.hrEndTime, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
      />
    );
    const datePicker3 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        mode="time"
        defaultDate={this.state.rrStartTime ? moment(this.state.rrStartTime, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
      />
    );
    const datePicker4 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        mode="time"
        defaultDate={this.state.rrEndTime ? moment(this.state.rrEndTime, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
      />
    );
    const datePicker5 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        mode="time"
        defaultDate={this.state.bedStartTime ? moment(this.state.bedStartTime, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
      />
    );
    const datePicker6 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        mode="time"
        defaultDate={this.state.bedEndTime ? moment(this.state.bedEndTime, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
      />
    );
    return (
      <div className="zhinengchuang-container">
        <div>
          <Row className="pgTitle">
            <Col span={6}>
              <Tag className="titleName">设备信息</Tag>
            </Col>
          </Row>
          <Row className="inputTitle">
            <Col span={24}>
              <FormItem {...formItemLayout} label="设备号">
                {getFieldDecorator('bianhao', {
                  rules: [
                    {required: true, message: '请输入设备号'},
                  ],
                })(<Input placeholder="请输入设备号"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="提醒设置">
                {getFieldDecorator('tixing', {
                  initialValue: 0,
                  rules: [
                    {required: true, message: '请选择提醒设置'},
                  ],
                })(<RadioGroup onChange={(val) => { onChangeTixing(val); }}>
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
                  <Tag className="titleName">心率阈值设置</Tag>
                </Col>
              </Row>
              <Row className="inputTitle">
                <Col span={24}>
                  <FormItem className="shebei-bottom" {...formItemLayout2} label="心率范围">
                    {getFieldDecorator('hrmin', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.hr.min : undefined,
                      rules: [],
                    })(<InputNumber disabled={getFieldsValue().tixing === 1} min={1}/>)}
                    <Col className="ant-form-text">次/分 -</Col>
                    <Col className="ant-form-text">
                      <FormItem >
                        {getFieldDecorator('hrmax', {
                          initialValue: viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.hr.max : undefined,
                          rules: [],
                        })(<InputNumber disabled={getFieldsValue().tixing === 1} min={1}/>)}
                      </FormItem>
                    </Col>
                    <Col className="ant-form-text">次/分</Col>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem {...formItemLayout2} label="持续时间">
                    {getFieldDecorator('hrduration', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.hr.duration : undefined,
                      rules: [],
                    })(<InputNumber disabled={getFieldsValue().tixing === 1} min={1}/>)}
                    <Col className="ant-form-text">分钟</Col>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <FormItem {...formItemLayout3} label="异常时间">
                    {getFieldDecorator('hrStart', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang && viewJigou.yuzhiChuang.hr && viewJigou.yuzhiChuang.hr.start && moment(viewJigou.yuzhiChuang.hr.start, 'HH:mm:ss').toDate(),
                      rules: [],
                    })(<PopPicker
                      datePicker={datePicker}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择时间"
                      date={this.state.hrStartTime}
                      okText="确认"
                      dismissText="取消"
                      onChange={(hrStartTime) => {
                        let reg = /\w\d+$/;
                        let hrstartMiao = viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.hr.start.split(':')[2] : undefined; // 获取秒值拼接
                        let hrstartTimeMiao = moment(hrStartTime).format('HH:mm:ss').replace(reg, hrstartMiao);
                        this.setState({
                          hrStartTime: moment(hrstartTimeMiao, 'HH:mm:ss').toDate(),
                        });
                      }}
                    >
                      <Button disabled={getFieldsValue().tixing === 1} className="ruyuan-time-color">{this.state.hrStartTime ? moment(this.state.hrStartTime).format('HH:mm:ss') : '请选择时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
                <Col span={2} className="ruyuan-time">
                  <FormItem>
                    <span> - </span>
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout3}>
                    {getFieldDecorator('hrEnd', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang && viewJigou.yuzhiChuang.hr && viewJigou.yuzhiChuang.hr.end && moment(viewJigou.yuzhiChuang.hr.end, 'HH:mm:ss').toDate(),
                      rules: [],
                    })(<PopPicker
                      datePicker={datePicker2}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择时间"
                      date={this.state.hrEndTime}
                      okText="确认"
                      dismissText="取消"
                      onChange={(hrEndTime) => {
                        let reg = /\w\d+$/;
                        let hrendMiao = viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.hr.end.split(':')[2] : undefined; // 获取秒值拼接
                        let hrendTimeMiao = moment(hrEndTime).format('HH:mm:ss').replace(reg, hrendMiao);
                        this.setState({
                          hrEndTime: moment(hrendTimeMiao, 'HH:mm:ss').toDate(),
                        });
                      }}
                    >
                      <Button disabled={getFieldsValue().tixing === 1} className="ruyuan-time-color">{this.state.hrEndTime ? moment(this.state.hrEndTime).format('HH:mm:ss') : '请选择时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
              </Row>
              <Row className="pgTitle">
                <Col span={6}>
                  <Tag className="titleName">呼吸阈值设置</Tag>
                </Col>
              </Row>
              <Row className="inputTitle">
                <Col span={24}>
                  <FormItem className="shebei-bottom" {...formItemLayout2} label="呼吸范围">
                    {getFieldDecorator('rrmin', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.rr.min : undefined,
                      rules: [
                      ],
                    })(<InputNumber disabled={getFieldsValue().tixing === 1} min={1}/>)}
                    <Col className="ant-form-text">次/分 -</Col>
                    <Col className="ant-form-text">
                      <FormItem>
                        {getFieldDecorator('rrmax', {
                          initialValue: viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.rr.max : undefined,
                          rules: [
                          ],
                        })(<InputNumber disabled={getFieldsValue().tixing === 1} min={1}/>)}
                      </FormItem>
                    </Col>
                    <Col className="ant-form-text">次/分</Col>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem {...formItemLayout2} label="持续时间">
                    {getFieldDecorator('rrduration', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.rr.duration : undefined,
                      rules: [],
                    })(<InputNumber disabled={getFieldsValue().tixing === 1} min={1}/>)}
                    <Col className="ant-form-text">分钟</Col>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <FormItem {...formItemLayout3} label="异常时间">
                    {getFieldDecorator('rrStart', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang && viewJigou.yuzhiChuang.rr && viewJigou.yuzhiChuang.rr.start && moment(viewJigou.yuzhiChuang.rr.start, 'HH:mm:ss').toDate(),
                      rules: [],
                    })(<PopPicker
                      datePicker={datePicker3}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择时间"
                      date={this.state.rrStartTime}
                      okText="确认"
                      dismissText="取消"
                      onChange={(rrStartTime) => {
                        let reg = /\w\d+$/;
                        let rrstartMiao = viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.rr.start.split(':')[2] : undefined; // 获取秒值拼接
                        let rrstartTimeMiao = moment(rrStartTime).format('HH:mm:ss').replace(reg, rrstartMiao);
                        this.setState({
                          rrStartTime: moment(rrstartTimeMiao, 'HH:mm:ss').toDate(),
                        });
                      }}
                    >
                      <Button disabled={getFieldsValue().tixing === 1} className="ruyuan-time-color">{this.state.rrStartTime ? moment(this.state.rrStartTime).format('HH:mm:ss') : '请选择时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
                <Col span={2} className="ruyuan-time">
                  <FormItem>
                    <span className="ruyuan-time-color"> - </span>
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout3}>
                    {getFieldDecorator('rrEnd', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang && viewJigou.yuzhiChuang.rr && viewJigou.yuzhiChuang.rr.end && moment(viewJigou.yuzhiChuang.rr.end, 'HH:mm:ss').toDate(),
                      rules: [],
                    })(<PopPicker
                      datePicker={datePicker4}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择时间"
                      date={this.state.rrEndTime}
                      okText="确认"
                      dismissText="取消"
                      onChange={(rrEndTime) => {
                        let reg = /\w\d+$/;
                        let rrendMiao = viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.rr.end.split(':')[2] : undefined; // 获取秒值拼接
                        let rrendTimeMiao = moment(rrEndTime).format('HH:mm:ss').replace(reg, rrendMiao);
                        this.setState({
                          rrEndTime: moment(rrendTimeMiao, 'HH:mm:ss').toDate(),
                        });
                      }}
                    >
                      <Button disabled={getFieldsValue().tixing === 1} className="ruyuan-time-color">{this.state.rrEndTime ? moment(this.state.rrEndTime).format('HH:mm:ss') : '请选择时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
              </Row>
              <Row className="pgTitle">
                <Col span={6}>
                  <Tag className="titleName">在/离床阈值设置</Tag>
                </Col>
              </Row>
              <Row className="inputTitle">
                <Col span={24}>
                  <FormItem {...formItemLayout2} label="离床时间">
                    {getFieldDecorator('offbed', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.bed.offbed : undefined,
                      rules: [],
                    })(<InputNumber disabled={getFieldsValue().tixing === 1} min={0}/>)}
                    <Col className="ant-form-text">小时</Col>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <FormItem {...formItemLayout3} label="异常时间">
                    {getFieldDecorator('bedStart', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang && viewJigou.yuzhiChuang.bed && viewJigou.yuzhiChuang.bed.start && moment(viewJigou.yuzhiChuang.bed.start, 'HH:mm:ss').toDate(),
                      rules: [],
                    })(<PopPicker
                      datePicker={datePicker5}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择时间"
                      date={this.state.bedStartTime}
                      okText="确认"
                      dismissText="取消"
                      onChange={(bedStartTime) => {
                        let reg = /\w\d+$/;
                        let bedstartMiao = viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.bed.start.split(':')[2] : undefined; // 获取秒值拼接
                        let bedstartTimeMiao = moment(bedStartTime).format('HH:mm:ss').replace(reg, bedstartMiao);
                        this.setState({
                          bedStartTime: moment(bedstartTimeMiao, 'HH:mm:ss').toDate(),
                        });
                      }}
                    >
                      <Button disabled={getFieldsValue().tixing === 1} className="ruyuan-time-color">{this.state.bedStartTime ? moment(this.state.bedStartTime).format('HH:mm:ss') : '请选择时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
                <Col span={2} className="ruyuan-time">
                  <FormItem>
                    <span className="ruyuan-time-color"> - </span>
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem {...formItemLayout3}>
                    {getFieldDecorator('bedEnd', {
                      initialValue: viewJigou && viewJigou.yuzhiChuang && viewJigou.yuzhiChuang.bed && viewJigou.yuzhiChuang.bed.end && moment(viewJigou.yuzhiChuang.bed.end, 'HH:mm:ss').toDate(),
                      rules: [],
                    })(<PopPicker
                      datePicker={datePicker6}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择时间"
                      date={this.state.bedEndTime}
                      okText="确认"
                      dismissText="取消"
                      onChange={(bedEndTime) => {
                        let reg = /\w\d+$/;
                        let bedendMiao = viewJigou && viewJigou.yuzhiChuang ? viewJigou.yuzhiChuang.bed.end.split(':')[2] : undefined; // 获取秒值拼接
                        let bedendTimeMiao = moment(bedEndTime).format('HH:mm:ss').replace(reg, bedendMiao);
                        this.setState({
                          bedEndTime: moment(bedendTimeMiao, 'HH:mm:ss').toDate(),
                        });
                      }}
                    >
                      <Button disabled={getFieldsValue().tixing === 1} className="ruyuan-time-color">{this.state.bedEndTime ? moment(this.state.bedEndTime).format('HH:mm:ss') : '请选择时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
              </Row>
            </div>
          }
        </div>
      </div>
    );
  }
}
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
})(Zncmorenyuzhi));
