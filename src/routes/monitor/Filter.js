import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row, Select, Input, message } from 'antd';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import { getBeforeDay } from 'utils';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;


const chuangState = [
  { id: 0, name: '离床' },
  { id: 1, name: '在床' },
  { id: 2, name: '无信号' },
  { id: 3, name: '设备总数' },
];

const zuijinOption = [
  { id: 1, name: '今日' },
  { id: 2, name: '昨日' },
  { id: 7, name: '最近7天' },
  { id: 3, name: '总人次' },
  { id: 4, name: '总设备量' },
];

const shebeiOption = [
  { id: 1, name: '智能床' },
  { id: 2, name: '智能床垫' },
  { id: 3, name: '多体征设备' },
];

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kaishiDate: moment(getBeforeDay()),
      jieshuDate: moment(),
      isInitDate: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { filter } = this.props;
    const { isInitDate } = this.state;
    if (filter.jieshuSj && !isInitDate) {
      this.setState({
        kaishiDate: moment(filter.kaishiSj, 'YYYY-MM-DD').toDate(),
        jieshuDate: moment(filter.jieshuSj, 'YYYY-MM-DD').toDate(),
        isInitDate: true,
      });
    }
    if (filter.cunrrTabIndex !== newProps.filter.cunrrTabIndex) {
      this.props.form.setFieldsValue({
        kaishiSj: undefined,
        jieshuSj: undefined,
        louceng: undefined,
        louhao: undefined,
        leixing: undefined,
        bedStatus: undefined,
        zuijin: undefined,
        keyword: undefined,
      });
    }
  }

  render() {
    const {
      app: {
        jigou,
      },
      dispatch,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue },
      filter,
      monitor,
      onFilterChange,
    } = this.props;

    const {
      cunrrTabIndex,
      loucengList,
      louhaoList,
      state: {
        total,
        nosignal,
        offbed,
        onbed,
      },
      cyc: {
        deviceTotal,
        latest7Days,
        personTimeTotal,
        today,
        yesterday,
      },
    } = monitor;


    const onQuery = () => {
      let fields = getFieldsValue();
      const { bedStatus } = fields;
      if (cunrrTabIndex === 3 && (!fields.kaishiSj || !fields.jieshuSj)) {
        message.error('必须选择开始时间和结束时间');
        return;
      }
      let params = {
        ...fields,
        cunrrTabIndex: filter.cunrrTabIndex,
        id: filter.id,
      };
      if (fields.kaishiSj) {
        params.kaishiSj = moment(fields.kaishiSj).format('YYYYMMDD');
        params.jieshuSj = moment(fields.jieshuSj).format('YYYYMMDD');
      }
      if (bedStatus) {
        params.bedStatus = Number(bedStatus);
      }
      onFilterChange(params);
    };

    const onChangeLouhao = (val) => {
      setFieldsValue({
        louceng: undefined,
      });
      if (val) {
        dispatch({
          type: 'monitor/alllouceng',
          payload: {
            louhao: val,
          },
        });
      } else {
        dispatch({
          type: 'monitor/updateLoucengList',
          payload: [],
        });
      }
    };

    let initKaishiSj;
    let initJieshuSj;
    if (filter.kaishiSj) {
      initKaishiSj = moment(filter.kaishiSj, 'YYYYMMDD').toDate();
    }
    if (filter.jieshuSj) {
      initJieshuSj = moment(filter.jieshuSj, 'YYYYMMDD').toDate();
    }

    const datePicker = (
      <DatePicker
        rootNativeProps={{ 'data-xx': 'yy' }}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.kaishiDate ? moment(this.state.kaishiDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const datePicker2 = (
      <DatePicker
        rootNativeProps={{ 'data-xx': 'yy' }}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.jieshuDate ? moment(this.state.jieshuDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const stateChoose = (id) => {
      switch (id) {
        case 0:
          return offbed || 0;
        case 1:
          return onbed || 0;
        case 2:
          return nosignal || 0;
        case 3:
          return total || 0;
        default:
          break;
      }
    };

    const updateStateNumber = () => {
      dispatch({
        type: 'monitor/getState',
        payload: {
          cunrrTabIndex,
          jigou: jigou.id,
        },
      });
    };

    const cycChoose = (id) => {
      switch (id) {
        case 1:
          return today || 0;
        case 2:
          return yesterday || 0;
        case 7:
          return latest7Days || 0;
        case 3:
          return personTimeTotal || 0;
        case 4:
          return deviceTotal || 0;
        default:
          break;
      }
    };

    const updateCycNumber = () => {
      dispatch({
        type: 'monitor/getCyc',
        payload: {
          jigou: jigou.id,
        },
      });
    };

    return (
      <div>
        <Form layout="inline">
          {
            cunrrTabIndex !== 3 && <div style={{ padding: '0 28px' }}>
              <Row className={styles.huliFilter}>
                <Col span={8}>
                  <FormItem label="楼号">
                    {getFieldDecorator('louhao', {
                      initialValue: filter && filter.louhao,
                      rules: [],
                    })(<Select
                      onChange={(val) => {
                        onChangeLouhao(val);
                      }}
                      allowClear
                      placeholder="请选择楼号"
                    >
                      {louhaoList.map((item) => {
                        return (
                          <Option key={item.louhao} value={String(item.louhao)}>
                            {item.louhao}
                          </Option>
                        );
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="楼层">
                    {getFieldDecorator('louceng', {
                      initialValue: filter && filter.louceng,
                      rules: [],
                    })(<Select
                      disabled={!loucengList.length > 0}
                      allowClear
                      placeholder="请选择楼层"
                    >
                      {loucengList.map((item) => {
                        return (
                          <Option key={item.louceng} value={String(item.louceng)}>
                            {item.louceng}
                          </Option>
                        );
                      })}
                    </Select>)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  {
                    cunrrTabIndex !== 2 ? <FormItem label="状态">
                      {getFieldDecorator('bedStatus', {
                        initialValue: filter && filter.bedStatus,
                        rules: [],
                      })(<Select
                        allowClear
                        optionLabelProp="name"
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        placeholder="请选择在床状态"
                        onFocus={updateStateNumber}
                      >{chuangState.map((k) => {
                        if (k.id === 3) { return <Option key={k.id} value={String(k.id)} name={k.name} disabled>{`${k.name}：${stateChoose(k.id)}`}</Option>; } else { return <Option key={k.id} name={k.name} value={String(k.id)}>{ `${k.name}：${stateChoose(k.id)}`}</Option>; }
                      })}</Select>)}
                    </FormItem> : <FormItem label="周期">
                      {getFieldDecorator('zuijin', {
                          initialValue: filter && filter.zuijin,
                          rules: [],
                        })(<Select
                          allowClear
                          optionLabelProp="name"
                          getPopupContainer={triggerNode => triggerNode.parentNode}
                          placeholder="请选择测量周期"
                          onFocus={updateCycNumber}
                        >{zuijinOption.map((k) => {
                          if (k.id === 3 || k.id === 4) { return <Option key={k.id} value={String(k.id)} name={k.name} disabled>{`${k.name}：${cycChoose(k.id)}` }</Option>; } else { return <Option key={k.id} name={k.name} value={String(k.id)}>{`${k.name}：${cycChoose(k.id)}`}</Option>; }
                        })}</Select>)}
                    </FormItem>
                  }
                </Col>
              </Row>
              <Row className={styles.searchFilter}>
                <Col span={24}>
                  <div style={{ float: 'right', padding: '2px 0' }}>
                    <Button
                      className="btn"
                      type="primary"
                      style={{ marginRight: 0 }}
                      onClick={onQuery}
                    >查询</Button>
                  </div>
                  <div style={{ width: 'calc(100% - 70px)' }}>
                    <FormItem>
                      {getFieldDecorator('keyword', {
                        initialValue: filter && filter.keyword,
                        rules: [],
                      })(<Input className="headerInput" placeholder="请输入人员姓名进行搜索" />)}
                    </FormItem>
                  </div>
                </Col>
              </Row>
            </div>
          }
          {
            cunrrTabIndex === 3 && <div style={{ padding: '0 28px' }}>
              <Row className={styles.huliFilter}>
                <Col span={8}>
                  <FormItem label="设备">
                    {getFieldDecorator('leixing', {
                      initialValue: filter && filter.leixing,
                      rules: [],
                    })(<Select
                      allowClear
                      placeholder="请选择设备"
                    >
                      {shebeiOption.map((item) => {
                        return (
                          <Option key={item.id} value={String(item.id)}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="楼号">
                    {getFieldDecorator('louhao', {
                      initialValue: filter && filter.louhao,
                      rules: [],
                    })(<Select
                      onChange={(val) => {
                        onChangeLouhao(val);
                      }}
                      allowClear
                      placeholder="请选择楼号"
                    >
                      {louhaoList.map((item) => {
                        return (
                          <Option key={item.louhao} value={String(item.louhao)}>
                            {item.louhao}
                          </Option>
                        );
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="楼层">
                    {getFieldDecorator('louceng', {
                      initialValue: filter && filter.louceng,
                      rules: [],
                    })(<Select
                      disabled={!loucengList.length > 0}
                      allowClear
                      placeholder="请选择楼层"
                    >
                      {loucengList.map((item) => {
                        return (
                          <Option key={item.louceng} value={String(item.louceng)}>
                            {item.louceng}
                          </Option>
                        );
                      })}
                    </Select>)
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row className={styles.huliFilter}>
                <Col span={24}>
                  <div style={{ float: 'right', padding: '2px 0' }}>
                    <Button
                      className="btn"
                      type="primary"
                      style={{ marginRight: 0, width: 112 }}
                      onClick={onQuery}
                    >查询</Button>
                  </div>
                  <div style={{ width: 'calc(100% - 112px)' }}>
                    <Row>
                      <Col span={11}>
                        <FormItem label="时间">
                          {getFieldDecorator('kaishiSj', {
                            initialValue: initKaishiSj || moment(getBeforeDay()).toDate(),
                            rules: [],
                          })(<PopPicker
                            datePicker={datePicker}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.kaishiDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                kaishiDate: date,
                              });
                            }}
                          >
                            <Button style={{ width: '100%' }}>{this.state.kaishiDate ? moment(this.state.kaishiDate).format('YYYY-MM-DD') : '请选择开始时间时间'}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                      <Col span={2} style={{ textAlign: 'center', marginTop: 5, marginLeft: -8 }}>
                        至
                      </Col>
                      <Col span={11}>
                        <FormItem>
                          {getFieldDecorator('jieshuSj', {
                            initialValue: initJieshuSj || moment().toDate(),
                            rules: [],
                          })(<PopPicker
                            datePicker={datePicker2}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.jieshuDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                jieshuDate: date,
                              });
                            }}
                          >
                            <Button style={{ width: '100%' }}>{this.state.jieshuDate ? moment(this.state.jieshuDate).format('YYYY-MM-DD') : '请选择结束时间时间'}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          }
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
