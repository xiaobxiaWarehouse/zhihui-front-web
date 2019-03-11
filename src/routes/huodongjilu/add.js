import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import Canyuren from './canyuren';
import Zhaopian from './zhaopian';

const FormItem = Form.Item;
const {Option} = Select;
const JXRSIcon = JXRS.Icon;

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
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
  style: {
  },
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  render() {
    const {
      dispatch,
      history,
      location,
      form: {
        getFieldsValue,
        getFieldDecorator,
        validateFields,
        setFieldsValue,
      },
      huodongjilu: {
        yuangongList,
        huodongjihuaList,
        editData,
      },
      app: {
        isFormChange,
      },
    } = this.props;

    const {
      canyuJl,
      zhaopian,
    } = editData;

    const canyurenProps = {
      location,
    };

    const zhaopianProps = {
      location,
    };

    const save = () => {
      validateFields((errors) => {
        const fields = getFieldsValue();
        if (errors) {
          return;
        }
        let huodongjiluRq;
        if (fields.huodongjiluRq) {
          huodongjiluRq = `${moment(fields.huodongjiluRq).format('YYYY-MM-DD HH:mm')}:00`;
        } else {
          message.error('请选择活动日期和时间');
          return;
        }
        const {
          zerenrenXm,
        } = fields;
        dispatch({
          type: 'huodongjilu/addHuodongjilu',
          payload: {
            ...Object.assign(fields, {huodongjiluRq: undefined}),
            shijian: huodongjiluRq,
            zerenrenXm: zerenrenXm ? yuangongList.filter((item) => {
              return zerenrenXm === item.id;
            })[0].xingming : undefined,
            zerenren: zerenrenXm,
            canyuJl: canyuJl.map((item, index) => {
              return {
                ...item,
                index: undefined,
              };
            }),
            zhaopian: zhaopian.map((item, index) => {
              return {
                ...item,
                xuhao: index + 1,
              };
            }),
          },
          callback: () => {
            dispatch({
              type: 'huodongjilu/updateScrollTop',
              payload: 0,
            });
            history.goBack();
          },
        });
      });
    };

    const onBack = (type) => {
      if (isFormChange) {
        dispatch({
          type: 'app/changeModalVisible',
          payload: {
            modalVisible: true,
            type,
          },
        });
      } else if (type === 1) {
        history.goBack();
      } else {
        dispatch(routerRedux.push({pathname: type}));
      }
    };

    const setZerenrenDh = (val) => {
      setFieldsValue({
        zerenrenDh: yuangongList.filter((item) => {
          return item.id === val;
        })[0].shouji,
      });
    };

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.date ? moment(this.state.date, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
        mode="datetime"
      />
    );

    return (
      <div className="content-inner">
        <div className="add-wrap">
          <div className="header">
            <div className="navGroup">
              <Row className="nav">
                <Col className="title">新增活动记录</Col>
                <Col className="navBtn">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      onBack('/huodongjilu/list');
                    }}
                  ><JXRSIcon type="left"/> 返回</Button>
                  <Permissions all="sys:huodongjilu:add">
                    <Button
                      type="primary"
                      style={{marginRight: 10}}
                      onClick={() => {
                        save();
                      }}
                    ><JXRSIcon type="save"/> 保存</Button>
                  </Permissions>
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch({
                        type: 'app/changeIsHomeBack',
                        payload: true,
                      });
                      onBack('/home');
                    }}
                  ><JXRSIcon type="home"/> 首页</Button>
                </Col>
              </Row>
            </div>
          </div>
          <div className="mainRaw bgWhite">
            <Form className="add-form" style={{padding: '28px 0'}}>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem required {...formItemLayout} label="活动时间" className="mb0important">
                    <Col span={5}>
                      <FormItem>
                        {getFieldDecorator('huodongjiluRq', {
                          rules: [
                            {required: true, message: '请选择日期和时间'},
                          ],
                        })(<PopPicker
                          datePicker={datePicker}
                          transitionName="rmc-picker-popup-slide-fade"
                          maskTransitionName="rmc-picker-popup-fade"
                          title="选择日期"
                          date={this.state.date}
                          okText="确认"
                          dismissText="取消"
                          onChange={(date) => {
                            this.setState({
                              date,
                            });
                          }}
                        >
                          <Button style={{width: 200}}>{this.state.date ? moment(this.state.date).format('YYYY-MM-DD HH:mm') : '请选择日期和时间'}</Button>
                        </PopPicker>)}
                      </FormItem>
                    </Col>
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="关联计划">
                    {getFieldDecorator('huodongJh', {
                      rules: [
                      ],
                    })(<Select allowClear placeholder="请选择关联计划">
                      {huodongjihuaList.map((k) => {
                        return <Option key={`${k.id}_${k.xiangmu}_${k.mingcheng}`} value={k.id}>{`${k.xiangmu}-${k.mingcheng}`}</Option>;
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="活动主题">
                    {getFieldDecorator('zhuti', {
                      rules: [
                        {required: true, message: '请输入活动主题'},
                      ],
                    })(<Input placeholder="请输入活动主题"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="参加单位">
                    {getFieldDecorator('canjiaDw', {
                      rules: [
                      ],
                    })(<Input placeholder="请输入参加单位"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="活动地点">
                    {getFieldDecorator('didian', {
                      rules: [
                      ],
                    })(<Input placeholder="请输入活动地点"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="责任人">
                    {getFieldDecorator('zerenrenXm', {
                      rules: [
                      ],
                    })(<Select placeholder="请选择责任人" onChange={(val) => { setZerenrenDh(val); }}>
                      {yuangongList.map((k) => {
                        return <Option key={`${k.id}_${k.shouji}`} value={k.id}>{`${k.xingming}-${k.shouji}`}</Option>;
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="电话">
                    {getFieldDecorator('zerenrenDh', {
                      rules: [
                      ],
                    })(<Input placeholder="请输入责任人电话" />)}
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Row style={{padding: '0 28px'}}>
              <Col span={24}>
                <Canyuren {...canyurenProps} />
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={24}>
                <Zhaopian {...zhaopianProps} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    huodongjilu: state.huodongjilu,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create({
  onValuesChange(props, values) {
    const {
      dispatch,
    } = props;
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  },
})(Add)));
