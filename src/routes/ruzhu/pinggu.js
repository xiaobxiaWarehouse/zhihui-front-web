import React from 'react';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment, { months } from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import {Button, Checkbox, Col, Form, Input, Radio, Row, Select} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import styles from './index.less';
import {nav} from './ruyuanOption';
import TipModal from './tipModal';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const JXRSIcon = JXRS.Icon;

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

const formItemLayout2 = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
  style: {
  },
};

const formItemLayout3 = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
  style: {
  },
};

const formItemLayout5 = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 12,
  },
  style: {
  },
};

const formItemLayout4 = {
  labelCol: {
  },
  wrapperCol: {
  },
  style: {
  },
};

const formItemLayout6 = {
  labelCol: {
    span: 11,
  },
  wrapperCol: {
    span: 13,
  },
  style: {
  },
};

const scrollToAnchor = (anchorName) => {
  if (anchorName) {
    // 找到锚点
    let anchorElement = document.getElementById(anchorName);
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) { anchorElement.scrollIntoView(); }
  }
};

const contentByLabel = (option) => {
  return option && option.map((item) => {
    item.label = item.content;
    return item;
  });
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruyuanDate: null,
      pingguDate: null,
      chushengDate: null,
      yongyaoDate: null,
      niaoguanDate: null,
      paibianDate: null,
      riqi: null,
      isInit: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const {location: {search}} = this.props;
    const query = queryString.parse(search);
    const {ruzhuPg} = query;
    const {ruyuan} = newProps;
    const {xmlDetail, shengqingList} = ruyuan;
    const {isInit} = this.state;
    if (((xmlDetail && ruzhuPg !== '-1') || (shengqingList && ruzhuPg === '-1')) && !isInit) {
      this.setState({
        isInit: true,
        ruyuanDate: ruzhuPg === '-1' ? shengqingList.shijiSj ? moment(shengqingList.shijiSj, 'YYYY-MM-DD').toDate() : undefined : xmlDetail.pre01 && xmlDetail.pre01['05'] ? moment(xmlDetail.pre01['05'], 'YYYY-MM-DD').toDate() : undefined,
        pingguDate: ruzhuPg !== '-1' && xmlDetail.pre01 && xmlDetail.pre01['06'] ? moment(xmlDetail.pre01['06'], 'YYYY-MM-DD').toDate() : undefined,
        chushengDate: ruzhuPg !== '-1' && xmlDetail['01'] && xmlDetail['01']['03'] ? moment(xmlDetail['01']['03'], 'YYYY-MM-DD').toDate() : undefined,
        yongyaoDate: ruzhuPg !== '-1' && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['03'] ? moment(xmlDetail['03']['02']['03'], 'YYYY-MM-DD').toDate() : undefined,
        niaoguanDate: ruzhuPg !== '-1' && xmlDetail['06'] && xmlDetail['06']['02'] && xmlDetail['06']['02']['03'] ? moment(xmlDetail['06']['02']['03'], 'YYYY-MM-DD').toDate() : undefined,
        paibianDate: ruzhuPg !== '-1' && xmlDetail['06'] && xmlDetail['06']['04'] ? moment(xmlDetail['06']['04'], 'YYYY-MM-DD').toDate() : undefined,
        riqi: ruzhuPg !== '-1' && xmlDetail.sup01 && xmlDetail.sup01['08'] ? moment(xmlDetail.sup01['08'], 'YYYY-MM-DD').toDate() : undefined,
      });
    }
  }

  render() {
    const {
      dispatch,
      history,
      form: {
        getFieldsValue,
        getFieldDecorator,
        setFieldsValue,
      },
      ruyuan: {
        xmlData,
        xmlDetail,
        banben,
        shengqingList,
        tipModalVisible,
      },
      app: {
        isFormChange,
      },
      location,
    } = this.props;

    const {search} = location;
    const query = queryString.parse(search);
    const {ruzhuPg, suoyin} = query;
    const save = () => {
      const fields = getFieldsValue();
      fields.pre01['05'] = fields.pre01['05'] ? moment(fields.pre01['05']).format('YYYY-MM-DD') : undefined;
      fields.pre01['06'] = fields.pre01['06'] ? moment(fields.pre01['06']).format('YYYY-MM-DD') : undefined;
      fields['01']['03'] = fields['01']['03'] ? moment(fields['01']['03']).format('YYYY-MM-DD') : undefined;
      fields['03']['02']['03'] = fields['03']['02']['03'] ? moment(fields['03']['02']['03']).format('YYYY-MM-DD') : undefined;
      fields['06']['02']['03'] = fields['06']['02']['03'] ? moment(fields['06']['02']['03']).format('YYYY-MM-DD') : undefined;
      fields['06']['04'] = fields['06']['04'] ? moment(fields['06']['04']).format('YYYY-MM-DD') : undefined;
      fields.sup01['08'] = fields.sup01['08'] ? moment(fields.sup01['08']).format('YYYY-MM-DD') : undefined;
      if (Number(query.ruzhuPg) === -1) {
        dispatch({
          type: 'ruyuan/addDanan',
          payload: {
            suoyin: Number(query.suoyin),
            neirong: JSON.stringify({
              ...fields,
            }),
            leixing: 1,
            banben,
          },
          callback: () => {
            history.goBack();
          },

        });
      } else {
        dispatch({
          type: 'ruyuan/modifyDanan',
          payload: {
            id: Number(query.ruzhuPg),
            suoyin: Number(query.suoyin),
            neirong: JSON.stringify({
              ...fields,
            }),
            leixing: 1,
            banben,
          },
          callback: () => {
            history.goBack();
          },
        });
      }
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

    const resetRuyuanDate = () => {
      this.setState({
        ruyuanDate: shengqingList.shijiSj ? moment(shengqingList.shijiSj, 'YYYY-MM-DD').toDate() : undefined,
      });
    };

    const tipModalProps = {
      visible: tipModalVisible,
      maskClosable: false,
      title: '温馨提示',
      wrapClassName: 'vertical-center-modal',
      onOk () {
        setFieldsValue({
          'pre01.01': shengqingList.chuangwei.length > 0 ? shengqingList.chuangwei[0].louceng : undefined,
          'pre01.03': shengqingList.chuangwei.length > 0 ? shengqingList.chuangwei[0].chuanghao : undefined,
          'pre01.05': shengqingList.shijiSj ? moment(shengqingList.shijiSj).format('YYYY-MM-DD') : undefined,
          '01.01': shengqingList.xingming,
          '01.02': shengqingList.xingbie ? String(shengqingList.xingbie) : undefined,
          '01.04': shengqingList.nianling || undefined,
          '01.05': shengqingList.shenfenzheng,
          '01.08': shengqingList.jiguan,
        });
        resetRuyuanDate();
        dispatch({
          type: 'ruyuan/hideTipModal',
        });
      },
      onCancel () {
        dispatch({
          type: 'ruyuan/hideTipModal',
        });
      },
    };

    const onUpdate = () => {
      dispatch({
        type: 'ruyuan/ruyuanshengqingXQ',
        payload: {
          suoyin: Number(suoyin),
        },
        callback: () => {
          dispatch({
            type: 'ruyuan/showTipModal',
          });
        },
      });
    };

    let initDate;

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.ruyuanDate ? moment(this.state.ruyuanDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const datePicker2 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.pingguDate ? moment(this.state.pingguDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const datePicker3 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.chushengDate ? moment(this.state.chushengDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const datePicker4 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.yongyaoDate ? moment(this.state.yongyaoDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const datePicker5 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.niaoguanDate ? moment(this.state.niaoguanDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const datePicker6 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.paibianDate ? moment(this.state.paibianDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const datePicker7 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.riqi ? moment(this.state.riqi, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    return (
      <div className="content-inner">
        <div className="add-wrap">
          <div className="header">
            <div className="navGroup">
              <Row className="nav">
                <Col className="title">录入入住评估表</Col>
                <Col className="navBtn">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      onBack(1);
                    }}
                  ><JXRSIcon type="left"/> 返回</Button>
                  {
                    ruzhuPg !== '-1' && <Permissions all="sys:pinggu:edit">
                      <Button
                        type="primary"
                        style={{marginRight: 10}}
                        onClick={() => {
                          onUpdate();
                        }}
                      >同步</Button>
                    </Permissions>
                  }
                  <Permissions all="sys:pinggu:edit">
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
            <Form className="add-form">
              <Row>
                <Col span={6} className={styles.nav}>
                  {
                    nav.map((item, navIndex) => {
                      return (
                        <Row key={item.id}>
                          <Col>
                            <FormItem>
                              <div onClick={() => { scrollToAnchor(item.id); }} className={styles.navName}>{`${navIndex + 1} ${item.name}`}</div>
                            </FormItem>
                          </Col>
                        </Row>
                      );
                    })
                  }
                </Col>
                <Col span={18} className={styles.pgContent}>
                  <div id="pre01" className={styles.ruzhuXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.pre01')}</Col>
                    </Row>
                    <Row style={{paddingTop: 13}}>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.01']}>
                          {getFieldDecorator('pre01.01', {
                            initialValue: ruzhuPg === '-1' ? shengqingList && shengqingList.chuangwei && shengqingList.chuangwei.length > 0 ? shengqingList.chuangwei[0].louceng : undefined : xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['01'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['pre01.01']}`}/>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.02']}>
                          {getFieldDecorator('pre01.02', {
                            initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['02'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['pre01.02']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.03']}>
                          {getFieldDecorator('pre01.03', {
                            initialValue: ruzhuPg === '-1' ? shengqingList && shengqingList.chuangwei && shengqingList.chuangwei.length > 0 ? shengqingList.chuangwei[0].chuanghao : undefined : xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['03'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['pre01.03']}`}/>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.04']}>
                          {getFieldDecorator('pre01.04', {
                            initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['04'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['pre01.04']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.05']}>
                          {getFieldDecorator('pre01.05', {
                            initialValue: ruzhuPg === '-1' ? shengqingList && shengqingList.shijiSj ? moment(shengqingList.shijiSj, 'YYYY-MM-DD').toDate() : undefined : xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['05'] ? moment(xmlDetail.pre01['05'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.ruyuanDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                ruyuanDate: date,
                              });
                            }}
                          >
                            <Button>{this.state.ruyuanDate ? moment(this.state.ruyuanDate).format('YYYY-MM-DD') : `请输入${xmlData && xmlData['pre01.05']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout} label={xmlData && xmlData['pre01.06']}>
                          {getFieldDecorator('pre01.06', {
                            initialValue: xmlDetail && xmlDetail.pre01 && xmlDetail.pre01['06'] ? moment(xmlDetail.pre01['06'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker2}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.pingguDate}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                pingguDate: date,
                              });
                            }}
                          >
                            <Button>{this.state.pingguDate ? moment(this.state.pingguDate).format('YYYY-MM-DD') : `请输入${xmlData && xmlData['pre01.06']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="01" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.01')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.01']}>
                              {getFieldDecorator('01.01', {
                                initialValue: ruzhuPg === '-1' ? shengqingList && shengqingList.xingming : xmlDetail && xmlDetail['01'] && xmlDetail['01']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.01']}`}/>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.02'].cap}>
                              {getFieldDecorator('01.02', {
                                initialValue: (ruzhuPg === '-1' ? shengqingList && shengqingList.xingbie ? String(shengqingList.xingbie) : undefined : (xmlDetail && xmlDetail['01'] && xmlDetail['01']['02'])) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={`请选择${xmlData && xmlData['01.02'].cap}`}>{xmlData && xmlData['01.02'].children.map((k) => {
                                return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                              })}</Select>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.03']}>
                              {getFieldDecorator('01.03', {
                                initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['03'] ? moment(xmlDetail['01']['03'], 'YYYY-MM-DD').toDate() : initDate,
                                rules: [
                                ],
                              })(<PopPicker
                                datePicker={datePicker3}
                                transitionName="rmc-picker-popup-slide-fade"
                                maskTransitionName="rmc-picker-popup-fade"
                                title="选择日期"
                                date={this.state.chushengDate}
                                okText="确认"
                                dismissText="取消"
                                onChange={(date) => {
                                  this.setState({
                                    chushengDate: date,
                                  });
                                }}
                              >
                                <Button>{this.state.chushengDate ? moment(this.state.chushengDate).format('YYYY-MM-DD') : `请选择${xmlData && xmlData['01.03']}`}</Button>
                              </PopPicker>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.04']}>
                              {getFieldDecorator('01.04', {
                                initialValue: ruzhuPg === '-1' ? shengqingList && shengqingList.nianling ? shengqingList.nianling : undefined : xmlDetail && xmlDetail['01'] && xmlDetail['01']['04'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.04']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.05']}>
                              {getFieldDecorator('01.05', {
                                initialValue: ruzhuPg === '-1' ? shengqingList && shengqingList.shenfenzheng ? shengqingList.shenfenzheng : undefined : xmlDetail && xmlDetail['01'] && xmlDetail['01']['05'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.05']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.06']}>
                              {getFieldDecorator('01.06', {
                                initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['06'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.06']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.07.01'].cap}>
                              {getFieldDecorator('01.07.01', {
                                initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['07'] && xmlDetail['01']['07']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['01.07.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('01.07.02', {
                                initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['07'] && xmlDetail['01']['07']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.07.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.08']}>
                              {getFieldDecorator('01.08', {
                                initialValue: ruzhuPg === '-1' ? shengqingList && shengqingList.jiguan ? shengqingList.jiguan : undefined : xmlDetail && xmlDetail['01'] && xmlDetail['01']['08'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.08']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.09'].cap}>
                              {getFieldDecorator('01.09', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['09']) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={intl.get('Ruyuan.01.09.placeholder')}>{xmlData && xmlData['01.09'].children.map((k) => {
                                return <Option key={k.value} value={k.value}>{k.content}</Option>;
                              })}</Select>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.10.01'].cap}>
                              {getFieldDecorator('01.10.01', {
                                initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['10'] && xmlDetail['01']['10']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['01.10.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4} label={xmlData && xmlData['01.10.02'].cap}>
                              {getFieldDecorator('01.10.02', {
                                initialValue: xmlDetail && xmlDetail['01'] && xmlDetail['01']['10'] && xmlDetail['01']['10']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.10.01'].cap}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.11'].cap}>
                              {getFieldDecorator('01.11', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['11']) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={intl.get('Ruyuan.01.11.placeholder')}>{xmlData && xmlData['01.11'].children.map((k) => {
                                return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                              })}</Select>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.12'].cap}>
                              {getFieldDecorator('01.12', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['12']) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={intl.get('Ruyuan.01.12.placeholder')}>{xmlData && xmlData['01.12'].children.map((k) => {
                                return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                              })}</Select>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.13.01'].cap}>
                              {getFieldDecorator('01.13.01', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['13'] && xmlDetail['01']['13']['01']) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={intl.get('Ruyuan.01.13.placeholder')}>{xmlData && xmlData['01.13.01'].children.map((k) => {
                                return <Option key={k.value} value={k.value}>{k.content}</Option>;
                              })}</Select>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('01.13.02', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['13'] && xmlDetail['01']['13']['02']) || initDate,
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.13.01'].cap}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.14.01'].cap}>
                              {getFieldDecorator('01.14.01', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['14'] && xmlDetail['01']['14']['01']) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={intl.get('Ruyuan.01.14.placeholder')}>{xmlData && xmlData['01.14.01'].children.map((k) => {
                                return <Option key={k.value} value={k.value}>{k.content}</Option>;
                              })}</Select>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('01.14.02', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['14'] && xmlDetail['01']['14']['02']) || initDate,
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.14.01'].cap}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['01.15.01'].cap}>
                              {getFieldDecorator('01.15.01', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['15'] && xmlDetail['01']['15']['01']) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={intl.get('Ruyuan.01.15.placeholder')}>{xmlData && xmlData['01.15.01'].children.map((k) => {
                                return <Option key={k.value} value={k.value}>{k.content}</Option>;
                              })}</Select>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <FormItem {...formItemLayout3}>
                              {getFieldDecorator('01.15.02', {
                                initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['15'] && xmlDetail['01']['15']['02']) || initDate,
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['01.15.01'].cap}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 995}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('01.16', {
                            initialValue: (xmlDetail && xmlDetail['01'] && xmlDetail['01']['16']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel((xmlData && xmlData['01.16'].children) || [])} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="02" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.02')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout5} label={xmlData && xmlData['02.01'].cap}>
                              {getFieldDecorator('02.01', {
                                initialValue: (xmlDetail && xmlDetail['02'] && xmlDetail['02']['01']) || initDate,
                                rules: [
                                ],
                              })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={intl.get('Ruyuan.02.01.placeholder')}>{xmlData && xmlData['02.01'].children.map((k) => {
                                return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
                              })}</Select>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['02.02.01'].cap}>
                              {getFieldDecorator('02.02.01', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['02'] && xmlDetail['02']['02']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['02.02.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4} >
                              {getFieldDecorator('02.02.02', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['02'] && xmlDetail && xmlDetail['02']['02']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['02.02.01'].cap}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout5} label={xmlData && xmlData['02.03.01'].cap}>
                              {getFieldDecorator('02.03.01', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['03'] && xmlDetail['02']['03']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['02.03.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('02.03.02', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['03'] && xmlDetail['02']['03']['02'],
                                rules: [
                                ],
                              })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['02.03.02'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['02.04.01'].cap}>
                              {getFieldDecorator('02.04.01', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['04'] && xmlDetail['02']['04']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['02.04.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('02.04.02', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['04'] && xmlDetail['02']['04']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['02.04.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['02.05.01'].cap}>
                              {getFieldDecorator('02.05.01', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['05'] && xmlDetail['02']['05']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['02.05.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('02.05.02', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['05'] && xmlDetail['02']['05']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['02.05.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['02.06.01'].cap}>
                              {getFieldDecorator('02.06.01', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['06'] && xmlDetail['02']['06']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['02.06.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('02.06.02', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['06'] && xmlDetail['02']['06']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['02.06.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['02.07.01'].cap}>
                              {getFieldDecorator('02.07.01', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['07'] && xmlDetail['02']['07']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['02.07.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('02.07.02', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['07'] && xmlDetail['02']['07']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={intl.get('Ruyuan.02.07.placeholder')} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['02.08']}>
                              {getFieldDecorator('02.08', {
                                initialValue: xmlDetail && xmlDetail['02'] && xmlDetail['02']['08'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['02.08']}`}/>)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 1126}} span={10} className={styles.huliContent} />
                    </Row>
                  </div>
                  <div id="03" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.03')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout5} label={xmlData && xmlData['03.01'].cap}>
                              {getFieldDecorator('03.01', {
                                initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['03.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['03.02.01']}>
                              {getFieldDecorator('03.02.01', {
                                initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['03.02.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['03.02.02']}>
                              {getFieldDecorator('03.02.02', {
                                initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['03.02.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['03.02.03']}>
                              {getFieldDecorator('03.02.03', {
                                initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['03'] ? moment(xmlDetail['03']['02']['03'], 'YYYY-MM-DD').toDate() : initDate,
                                rules: [
                                ],
                              })(<PopPicker
                                datePicker={datePicker4}
                                transitionName="rmc-picker-popup-slide-fade"
                                maskTransitionName="rmc-picker-popup-fade"
                                title="选择日期"
                                date={this.state.yongyaoDate}
                                okText="确认"
                                dismissText="取消"
                                onChange={(date) => {
                                  this.setState({
                                    yongyaoDate: date,
                                  });
                                }}
                              >
                                <Button>{this.state.yongyaoDate ? moment(this.state.yongyaoDate).format('YYYY-MM-DD') : `请选择${xmlData && xmlData['03.02.03']}`}</Button>
                              </PopPicker>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['03.02.04']}>
                              {getFieldDecorator('03.02.04', {
                                initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['04'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['03.02.04']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['03.02.05']}>
                              {getFieldDecorator('03.02.05', {
                                initialValue: xmlDetail && xmlDetail['03'] && xmlDetail['03']['02'] && xmlDetail['03']['02']['05'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['03.02.05']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 317}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('03.03', {
                            initialValue: (xmlDetail && xmlDetail['03'] && xmlDetail['03']['03']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['03.03'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="04" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.04')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['04.01.01'].cap}>
                              {getFieldDecorator('04.01.01', {
                                initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['01'] && xmlDetail['04']['01']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['04.01.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('04.01.02', {
                                initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['01'] && xmlDetail['04']['01']['02'],
                                rules: [
                                ],
                              })(<Input placeholder="请输入吸烟说明" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['04.02'].cap}>
                              {getFieldDecorator('04.02', {
                                initialValue: (xmlDetail && xmlDetail['04'] && xmlDetail['04']['02']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['04.02'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['04.03'].cap}>
                              {getFieldDecorator('04.03', {
                                initialValue: (xmlDetail && xmlDetail['04'] && xmlDetail['04']['03']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['04.03'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['04.04.01']}>
                              {getFieldDecorator('04.04.01', {
                                initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['04'] && xmlDetail['04']['04']['01'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['04.04.01']}`} />)}
                              次/分
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={`${xmlData && xmlData['04.04.01']}选项`}>
                              {getFieldDecorator('04.04.02', {
                                initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['04'] && xmlDetail['04']['04']['02'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['04.04.02'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['04.04.03']}>
                              {getFieldDecorator('04.04.03', {
                                initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['04'] && xmlDetail['04']['04']['03'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['04.04.03']}`} />)}
                              次/分
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={`${xmlData && xmlData['04.04.03']}选项`}>
                              {getFieldDecorator('04.04.04', {
                                initialValue: xmlDetail && xmlDetail['04'] && xmlDetail['04']['04'] && xmlDetail['04']['04']['04'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['04.04.04'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 598}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('04.05', {
                            initialValue: (xmlDetail && xmlDetail['04'] && xmlDetail['04']['05']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['04.05'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="05" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.05')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.01']}>
                              {getFieldDecorator('05.01', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['05.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.02'].cap}>
                              {getFieldDecorator('05.02', {
                                initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['02']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['05.02'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.03.01'].cap}>
                              {getFieldDecorator('05.03.01', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['03'] && xmlDetail['05']['03']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['05.03.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('05.03.02', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['03'] && xmlDetail['05']['03']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['05.03.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.04'].cap}>
                              {getFieldDecorator('05.04', {
                                initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['04']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['05.04'].children) || []}/>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.05.01'].cap}>
                              {getFieldDecorator('05.05.01', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['05'] && xmlDetail['05']['05']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['05.05.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('05.05.02', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['05'] && xmlDetail['05']['05']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['05.05.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.06'].cap}>
                              {getFieldDecorator('05.06', {
                                initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['06']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['05.06'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.07'].cap}>
                              {getFieldDecorator('05.07', {
                                initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['07']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['05.07'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['05.08.01']}>
                              {getFieldDecorator('05.08.01', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['08'] && xmlDetail['05']['08']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['05.08.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.08.02']}>
                              {getFieldDecorator('05.08.02', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['08'] && xmlDetail['05']['08']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['05.08.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['05.09.01']}>
                              {getFieldDecorator('05.09.01', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['09'] && xmlDetail['05']['09']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`${xmlData && xmlData['05.09.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.09.02']}>
                              {getFieldDecorator('05.09.02', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['09'] && xmlDetail['05']['09']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`${xmlData && xmlData['05.09.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['05.10.01']}>
                              {getFieldDecorator('05.10.01', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['10'] && xmlDetail['05']['10']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`${xmlData && xmlData['05.10.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['05.10.02']}>
                              {getFieldDecorator('05.10.02', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['10'] && xmlDetail['05']['10']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['05.10.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={`${xmlData && xmlData['05.11.01']}`}>
                              {getFieldDecorator('05.11.01', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['11'] && xmlDetail['05']['11']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['05.11.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={`${xmlData && xmlData['05.11.02']}`}>
                              {getFieldDecorator('05.11.02', {
                                initialValue: xmlDetail && xmlDetail['05'] && xmlDetail['05']['11'] && xmlDetail['05']['11']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['05.11.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 1179}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('05.12', {
                            initialValue: (xmlDetail && xmlDetail['05'] && xmlDetail['05']['12']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['05.12'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="06" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.06')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['06.01.01'].cap}>
                              {getFieldDecorator('06.01.01', {
                                initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['01'] && xmlDetail['06']['01']['01']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['06.01.01'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem>
                              {getFieldDecorator('06.01.02', {
                                initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['01'] && xmlDetail['06']['01']['02']) || [],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={xmlData && xmlData['06.01.01'].cap} />)}
                              次/夜
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['06.02.01'].cap}>
                              {getFieldDecorator('06.02.01', {
                                initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['02'] && xmlDetail['06']['02']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['06.02.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['06.02.02']}>
                              {getFieldDecorator('06.02.02', {
                                initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['02'] && xmlDetail['06']['02']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['06.02.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['06.02.03']}>
                              {getFieldDecorator('06.02.03', {
                                initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['02'] && xmlDetail['06']['02']['03'] ? moment(xmlDetail['06']['02']['03'], 'YYYY-MM-DD').toDate() : initDate,
                                rules: [
                                ],
                              })(<PopPicker
                                datePicker={datePicker5}
                                transitionName="rmc-picker-popup-slide-fade"
                                maskTransitionName="rmc-picker-popup-fade"
                                title="选择日期"
                                date={this.state.niaoguanDate}
                                okText="确认"
                                dismissText="取消"
                                onChange={(date) => {
                                  this.setState({
                                    niaoguanDate: date,
                                  });
                                }}
                              >
                                <Button>{this.state.niaoguanDate ? moment(this.state.niaoguanDate).format('YYYY-MM-DD') : `请选择${xmlData && xmlData['06.02.03']}`}</Button>
                              </PopPicker>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['06.03']}>
                              {getFieldDecorator('06.03', {
                                initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['03'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['06.03']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['06.04']}>
                              {getFieldDecorator('06.04', {
                                initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['04'] ? moment(xmlDetail['06']['04'], 'YYYY-MM-DD').toDate() : initDate,
                                rules: [
                                ],
                              })(<PopPicker
                                datePicker={datePicker6}
                                transitionName="rmc-picker-popup-slide-fade"
                                maskTransitionName="rmc-picker-popup-fade"
                                title="选择日期"
                                date={this.state.paibianDate}
                                okText="确认"
                                dismissText="取消"
                                onChange={(date) => {
                                  this.setState({
                                    paibianDate: date,
                                  });
                                }}
                              >
                                <Button>{this.state.paibianDate ? moment(this.state.paibianDate).format('YYYY-MM-DD') : `${xmlData && xmlData['06.04']}`}</Button>
                              </PopPicker>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem className="lineFeedRadio" {...formItemLayout2} label={xmlData && xmlData['06.05'].cap}>
                              {getFieldDecorator('06.05', {
                                initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['05'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['06.05'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem className="lineFeedRadio" {...formItemLayout2} label={xmlData && xmlData['06.06'].cap}>
                              {getFieldDecorator('06.06', {
                                initialValue: xmlDetail && xmlDetail['06'] && xmlDetail['06']['06'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['06.06'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['06.07'].cap}>
                              {getFieldDecorator('06.07', {
                                initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['07']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['06.07'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 821}} span={10} className={styles.huliContent}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout4} label={intl.get('Ruyuan.06.08.01')}>
                              {getFieldDecorator('06.08.01', {
                                initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['08'] && xmlDetail['06']['08']['01']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['06.08.01'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout4} label={intl.get('Ruyuan.06.08.02')}>
                              {getFieldDecorator('06.08.02', {
                                initialValue: (xmlDetail && xmlDetail['06'] && xmlDetail['06']['08'] && xmlDetail['06']['08']['02']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['06.08.02'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                  <div id="07" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.07')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['07.01.01'].cap}>
                              {getFieldDecorator('07.01.01', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['01'] && xmlDetail['07']['01']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['07.01.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={intl.get('Ruyuan.07.01.02')}>
                              {getFieldDecorator('07.01.02', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['01'] && xmlDetail['07']['01']['02'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['07.01.02'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['07.02.01'].cap}>
                              {getFieldDecorator('07.02.01', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['02'] && xmlDetail['07']['02']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['07.02.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={intl.get('Ruyuan.07.02.02')}>
                              {getFieldDecorator('07.02.02', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['02'] && xmlDetail['07']['02']['02'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['07.02.02'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['07.03'].cap}>
                              {getFieldDecorator('07.03', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['03'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['07.03'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['07.04'].cap}>
                              {getFieldDecorator('07.04', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['04'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['07.04'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['07.05'].cap}>
                              {getFieldDecorator('07.05', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['05'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['07.05'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['07.06.01']}>
                              {getFieldDecorator('07.06.01', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['06'] && xmlDetail['07']['06']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['07.06.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['07.06.02']}>
                              {getFieldDecorator('07.06.02', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['06'] && xmlDetail['07']['06']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['07.06.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['07.07.01']}>
                              {getFieldDecorator('07.07.01', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['07'] && xmlDetail['07']['07']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['07.07.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['07.07.02']}>
                              {getFieldDecorator('07.07.02', {
                                initialValue: xmlDetail && xmlDetail['07'] && xmlDetail['07']['07'] && xmlDetail['07']['07']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['07.07.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 772}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('07.08', {
                            initialValue: (xmlDetail && xmlDetail['07'] && xmlDetail['07']['08']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['07.08'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="08">
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.08')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['08.01'].cap}>
                              {getFieldDecorator('08.01', {
                                initialValue: (xmlDetail && xmlDetail['08'] && xmlDetail['08']['01']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['08.01'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['08.02'].cap}>
                              {getFieldDecorator('08.02', {
                                initialValue: (xmlDetail && xmlDetail['08'] && xmlDetail['08']['02']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['08.02'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['08.03'].cap}>
                              {getFieldDecorator('08.03', {
                                initialValue: (xmlDetail && xmlDetail['08'] && xmlDetail['08']['03']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['08.03'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['08.04.01']}>
                              {getFieldDecorator('08.04.01', {
                                initialValue: xmlDetail && xmlDetail['08'] && xmlDetail['08']['04'] && xmlDetail['08']['04']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['08.04.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['08.04.02']}>
                              {getFieldDecorator('08.04.02', {
                                initialValue: xmlDetail && xmlDetail['08'] && xmlDetail['08']['04'] && xmlDetail['08']['04']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['08.04.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 429}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('08.05', {
                            initialValue: (xmlDetail && xmlDetail['08'] && xmlDetail['08']['05']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['08.05'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="09" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.09')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['09.01'].cap}>
                              {getFieldDecorator('09.01', {
                                initialValue: (xmlDetail && xmlDetail['09'] && xmlDetail['09']['01']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['09.01'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['09.02'].cap}>
                              {getFieldDecorator('09.02', {
                                initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['02'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['09.02'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['09.03.01']}>
                              {getFieldDecorator('09.03.01', {
                                initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['03'] && xmlDetail['09']['03']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['09.03.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['09.03.02']}>
                              {getFieldDecorator('09.03.02', {
                                initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['03'] && xmlDetail['09']['03']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['09.03.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['09.04.01']}>
                              {getFieldDecorator('09.04.01', {
                                initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['04'] && xmlDetail['09']['04']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['09.04.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['09.04.02']}>
                              {getFieldDecorator('09.04.02', {
                                initialValue: xmlDetail && xmlDetail['09'] && xmlDetail['09']['04'] && xmlDetail['09']['04']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['09.04.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 342}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('09.05', {
                            initialValue: (xmlDetail && xmlDetail['09'] && xmlDetail['09']['05']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['09.05'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="10" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.10')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['10.01.01'].cap}>
                              {getFieldDecorator('10.01.01', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['01'] && xmlDetail['10']['01']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['10.01.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('10.01.02', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['01'] && xmlDetail['10']['01']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['10.01.01'].cap}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['10.02'].cap}>
                              {getFieldDecorator('10.02', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['02'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['10.02'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['10.03'].cap}>
                              {getFieldDecorator('10.03', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['03'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['10.03'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['10.04'].cap}>
                              {getFieldDecorator('10.04', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['04'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['10.04'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['10.05.01'].cap}>
                              {getFieldDecorator('10.05.01', {
                                initialValue: (xmlDetail && xmlDetail['10'] && xmlDetail['10']['05'] && xmlDetail['10']['05']['01']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['10.05.01'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('10.05.02', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['05'] && xmlDetail['10']['05']['02'],
                                rules: [
                                ],
                              })(<Input placeholder="请输入破损说明" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('10.05.03', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['05'] && xmlDetail['10']['05']['03'],
                                rules: [
                                ],
                              })(<Input placeholder="请输入造口粘膜说明" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['10.06.01'].cap}>
                              {getFieldDecorator('10.06.01', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['06'] && xmlDetail['10']['06']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['10.06.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['10.06.02'].cap}>
                              {getFieldDecorator('10.06.02', {
                                initialValue: (xmlDetail && xmlDetail['10'] && xmlDetail['10']['06'] && xmlDetail['10']['06']['02']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['10.06.02'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('10.06.03', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['06'] && xmlDetail['10']['06']['03'],
                                rules: [
                                ],
                              })(<Input placeholder="请输入引流管说明" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('10.06.04', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['06'] && xmlDetail['10']['06']['04'],
                                rules: [
                                ],
                              })(<Input placeholder="请输入其它说明" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['10.07.01']}>
                              {getFieldDecorator('10.07.01', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['07'] && xmlDetail['10']['07']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['10.07.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['10.07.02']}>
                              {getFieldDecorator('10.07.02', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['07'] && xmlDetail['10']['07']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['10.07.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['10.08.01']}>
                              {getFieldDecorator('10.08.01', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['08'] && xmlDetail['10']['08']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['10.08.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['10.08.02']}>
                              {getFieldDecorator('10.08.02', {
                                initialValue: xmlDetail && xmlDetail['10'] && xmlDetail['10']['08'] && xmlDetail['10']['08']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['10.08.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 1057}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('10.09', {
                            initialValue: (xmlDetail && xmlDetail['10'] && xmlDetail['10']['09']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['10.09'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="11" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.11')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['11.01.01'].cap}>
                              {getFieldDecorator('11.01.01', {
                                initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['01'] && xmlDetail['11']['01']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['11.01.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('11.01.02', {
                                initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['01'] && xmlDetail['11']['01']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['11.01.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['11.02.01'].cap}>
                              {getFieldDecorator('11.02.01', {
                                initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['02'] && xmlDetail['11']['02']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['11.02.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('11.02.02', {
                                initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['02'] && xmlDetail['11']['02']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['11.02.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['11.03'].cap}>
                              {getFieldDecorator('11.03', {
                                initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['03'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['11.03'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['11.04']}>
                              {getFieldDecorator('11.04', {
                                initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['04'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['11.04']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['11.05']}>
                              {getFieldDecorator('11.05', {
                                initialValue: xmlDetail && xmlDetail['11'] && xmlDetail['11']['05'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['11.05']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 604}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('11.06', {
                            initialValue: (xmlDetail && xmlDetail['11'] && xmlDetail['11']['06']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['11.06'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="12" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.12')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['12.01']}>
                              {getFieldDecorator('12.01', {
                                initialValue: xmlDetail && xmlDetail['12'] && xmlDetail['12']['01'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['12.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['12.02'].cap}>
                              {getFieldDecorator('12.02', {
                                initialValue: (xmlDetail && xmlDetail['12'] && xmlDetail['12']['02']) || [],
                                rules: [
                                ],
                              })(<CheckboxGroup className={styles.CheckboxGroup} options={contentByLabel(xmlData && xmlData['12.02'].children) || []} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['12.03.01']}>
                              {getFieldDecorator('12.03.01', {
                                initialValue: xmlDetail && xmlDetail['12'] && xmlDetail['12']['03'] && xmlDetail['12']['03']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`${xmlData && xmlData['12.03.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['12.03.02']}>
                              {getFieldDecorator('12.03.02', {
                                initialValue: xmlDetail && xmlDetail['12'] && xmlDetail['12']['03'] && xmlDetail['12']['03']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['12.03.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 346}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('12.04', {
                            initialValue: (xmlDetail && xmlDetail['12'] && xmlDetail['12']['04']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['12.04'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="13" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.13')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['13.01.01'].cap}>
                              {getFieldDecorator('13.01.01', {
                                initialValue: xmlDetail && xmlDetail['13'] && xmlDetail['13']['01'] && xmlDetail['13']['01']['01'],
                                rules: [
                                ],
                              })(<RadioGroup className="op-radio-group">
                                {
                                  xmlData && xmlData['13.01.01'].children.map((item) => {
                                    return <Radio key={item.value} value={item.value}>{item.content}</Radio>;
                                  })
                                }
                              </RadioGroup>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <FormItem {...formItemLayout4}>
                              {getFieldDecorator('13.01.02', {
                                initialValue: xmlDetail && xmlDetail['13'] && xmlDetail['13']['01'] && xmlDetail['13']['01']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['13.01.03']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} className="lineFeedForm" label={xmlData && xmlData['13.02.01']}>
                              {getFieldDecorator('13.02.01', {
                                initialValue: xmlDetail && xmlDetail['13'] && xmlDetail['13']['02'] && xmlDetail['13']['02']['01'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['13.02.01']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['13.02.02']}>
                              {getFieldDecorator('13.02.02', {
                                initialValue: xmlDetail && xmlDetail['13'] && xmlDetail['13']['02'] && xmlDetail['13']['02']['02'],
                                rules: [
                                ],
                              })(<Input placeholder={`请输入${xmlData && xmlData['13.02.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 330}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('13.03', {
                            initialValue: (xmlDetail && xmlDetail['13'] && xmlDetail['13']['03']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['13.03'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="14" className={styles.jibenXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.14')}</Col>
                      <Col span={4} push={4} className={styles.pgxx}>{intl.get('Ruyuan.pgxx')}</Col>
                      <Col span={4} push={4} className={styles.hlzd}>{intl.get('Ruyuan.hlzd')}</Col>
                    </Row>
                    <Row>
                      <Col span={14} style={{paddingTop: 13}}>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.01']}>
                              {getFieldDecorator('14.01.01', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['01'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['14.01.01']}`} />)}
                              °C
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.02']}>
                              {getFieldDecorator('14.01.02', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['02'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['14.01.02']}`} />)}
                              次/分
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.03']}>
                              {getFieldDecorator('14.01.03', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['03'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['14.01.03']}`} />)}
                              次/分
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.04']}>
                              {getFieldDecorator('14.01.04', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['04'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['14.01.04']}`} />)}
                              次/分
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.05']}>
                              {getFieldDecorator('14.01.05', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['05'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['14.01.05']}`} />)}
                              mmHg
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.06']}>
                              {getFieldDecorator('14.01.06', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['06'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['14.01.06']}`} />)}
                              cm
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.01.07']}>
                              {getFieldDecorator('14.01.07', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['01'] && xmlDetail['14']['01']['07'],
                                rules: [
                                ],
                              })(<Input className={styles.houzhuiInput} placeholder={`请输入${xmlData && xmlData['14.01.07']}`} />)}
                              kg
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.02']}>
                              {getFieldDecorator('14.02', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['02'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['14.02']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormItem {...formItemLayout2} label={xmlData && xmlData['14.03']}>
                              {getFieldDecorator('14.03', {
                                initialValue: xmlDetail && xmlDetail['14'] && xmlDetail['14']['03'],
                                rules: [
                                ],
                              })(<TextArea rows={4} placeholder={`请输入${xmlData && xmlData['14.03']}`} />)}
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col style={{paddingTop: 13, height: 632}} span={10} className={styles.huliContent}>
                        <FormItem {...formItemLayout3} >
                          {getFieldDecorator('14.04', {
                            initialValue: (xmlDetail && xmlDetail['14'] && xmlDetail['14']['04']) || [],
                            rules: [
                            ],
                          })(<CheckboxGroup options={contentByLabel(xmlData && xmlData['14.04'].children) || []} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div id="sup01" className={styles.ruzhuXX}>
                    <Row className={styles.pgTitle}>
                      <Col span={6} className={styles.titleName}>{intl.get('Ruyuan.nav.sup01')}</Col>
                    </Row>
                    <Row style={{paddingTop: 13}}>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.01']}>
                          {getFieldDecorator('sup01.01', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['01'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['sup01.01']}`}/>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.02']}>
                          {getFieldDecorator('sup01.02', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['02'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['sup01.02']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.03']}>
                          {getFieldDecorator('sup01.03', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['03'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['sup01.03']}`}/>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.04']}>
                          {getFieldDecorator('sup01.04', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['04'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['sup01.04']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.05']}>
                          {getFieldDecorator('sup01.05', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['05'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['sup01.05']}`}/>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.06']}>
                          {getFieldDecorator('sup01.06', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['06'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['sup01.06']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.07']}>
                          {getFieldDecorator('sup01.07', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['07'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['sup01.07']}`}/>)}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.08']}>
                          {getFieldDecorator('sup01.08', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['08'] ? moment(xmlDetail.sup01['08'], 'YYYY-MM-DD').toDate() : initDate,
                            rules: [
                            ],
                          })(<PopPicker
                            datePicker={datePicker7}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            title="选择日期"
                            date={this.state.riqi}
                            okText="确认"
                            dismissText="取消"
                            onChange={(date) => {
                              this.setState({
                                riqi: date,
                              });
                            }}
                          >
                            <Button>{this.state.riqi ? moment(this.state.riqi).format('YYYY-MM-DD') : `请选择${xmlData && xmlData['sup01.08']}`}</Button>
                          </PopPicker>)}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem {...formItemLayout6} label={xmlData && xmlData['sup01.09']}>
                          {getFieldDecorator('sup01.09', {
                            initialValue: xmlDetail && xmlDetail.sup01 && xmlDetail.sup01['09'],
                            rules: [
                            ],
                          })(<Input placeholder={`请输入${xmlData && xmlData['sup01.09']}`}/>)}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        {
        tipModalVisible && <TipModal {...tipModalProps}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
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
