import React from 'react';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import {Button, Col, Form, Input, Radio, Row, Select} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import styles from './index.less';
import SelectModal from './SelectModal';
import ChuangweiModal from './ChuangweiModal';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;
const {Record} = Layout;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
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

const chuzhiDzRadio = [{
  id: 2,
  value: '修改',
}, {
  id: 1,
  value: '办理',
}, {
  id: 3,
  value: '完成',
}, {
  id: 4,
  value: '作废',
}];

const yuyueStatus = [
  {id: 1, value: '待处理'},
  {id: 2, value: '已完成'},
  {id: 3, value: '已作废'},
];

const fieldsChuzhiDz = (state) => {
  return chuzhiDzRadio.filter((item) => {
    if (state === 1) {
      return item.id !== 1;
    } else if (state === 2) {
      return item.id === 1 || item.id === 2;
    } else if (state === 3) {
      return item.id === 1 || item.id === 2;
    }
    return item;
  });
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruzhuDate: null,
      jiezhiDate: null,
    };
  }

  componentWillReceiveProps(newProps) {
    const {yuding} = this.props;
    const {editData} = yuding;
    if ((editData === null) && ((newProps.yuding.editData && newProps.yuding.editData.ruzhuSj) || (newProps.yuding.editData && newProps.yuding.editData.jiezhiSj))) {
      this.setState({
        ruzhuDate: newProps.yuding.editData.ruzhuSj ? moment(newProps.yuding.editData.ruzhuSj, 'YYYY-MM-DD HH:mm:ss').toDate() : null,
        jiezhiDate: newProps.yuding.editData.jiezhiSj ? moment(newProps.yuding.editData.jiezhiSj, 'YYYY-MM-DD HH:mm:ss').toDate() : null,
      });
    }
  }

  render() {
    const {
      dispatch,
      history,
      location,
      form: {
        getFieldsValue,
        validateFields,
        setFieldsValue,
        getFieldDecorator,
      },
      yuding: {
        selectModalVisible,
        chuangweiModalVisible,
        selectData,
        yuangongList,
        currentSelectData,
        editData,
        savaChuangwei,
      },
      app: {
        isFormChange,
        allHulidengji,
        allXingbie,
      },
    } = this.props;

    const {search} = location;
    const query = queryString.parse(search);

    const filterObj = (obj) => {
      let newObj = {};
      for (let item in obj) {
        if (obj[item]) {
          newObj[item] = obj[item];
        }
      }
      return newObj;
    };

    const save = () => {
      validateFields((errors) => {
        const fields = getFieldsValue();
        if (errors) {
          return;
        }
        const {
          jiezhiSj,
          ruzhuSj,
          zerenrenXm,
        } = fields;
        let newFields = filterObj({...fields});
        let params = {
          suoyin: editData.suoyin,
          id: Number(query.id),
          ...newFields,
          zerenren: zerenrenXm,
          chuangweiLx: 2,
          baofang: 1,
          zerenrenXm: zerenrenXm ? yuangongList.filter((item) => {
            return zerenrenXm === item.id;
          })[0].xingming : undefined,
        };
        if (ruzhuSj) {
          params.ruzhuSj = moment(ruzhuSj).format('YYYY-MM-DD HH:mm:ss');
        }
        if (jiezhiSj) {
          params.jiezhiSj = moment(jiezhiSj).format('YYYY-MM-DD HH:mm:ss');
        }
        if (fields.nianling) {
          params.nianling = Number(fields.nianling);
        }
        if (fields.zhuangtai) {
          params.zhuangtai = Number(fields.zhuangtai);
        }
        if (savaChuangwei.length > 0) {
          params.chuangwei = savaChuangwei;
          params.baofang = savaChuangwei[0].baofang;
        } else {
          params.chuangwei = [];
        }
        dispatch({
          type: 'yuding/modifyYuding',
          payload: {
            id: Number(query.id),
            ...params,
          },
          callback: () => {
            history.goBack();
          },
        });
      });
    };

    const addChuangwei = () => {
      let params = {
        screen: 2,
        suoyin: editData && editData.suoyin,
      };
      dispatch({
        type: 'yuding/getChuangweiYueding',
        payload: {
          ...params,
        },
        callback: (data) => {
          dispatch({
            type: 'yuding/showChuangweiModal',
          });
        },
      });
    };

    const selectModalProps = {
      width: 744,
      currentSelectData,
      list: selectData,
      visible: selectModalVisible,
      maskClosable: false,
      title: '存在疑似重复休养员，请选择',
      wrapClassName: 'vertical-center-modal',
      onOk () {
        if (currentSelectData.id) {
          const fields = getFieldsValue();
          const {
            nianling,
            xingbie,
          } = currentSelectData;
          setFieldsValue({
            nianling: fields.nianling ? fields.nianling : nianling > 0 ? nianling : undefined,
            xingbie: fields.xingbie ? String(fields.xingbie) : xingbie > 0 ? String(xingbie) : undefined,
          });
          dispatch({
            type: 'yuding/updataSelectSuoyin',
            payload: currentSelectData,
          });
        }
        dispatch({
          type: 'yuding/hideSelectModal',
        });
      },
      onCancel () {
        dispatch({
          type: 'yuding/hideSelectModal',
        });
      },
      onSelect(item) {
        dispatch({
          type: 'yuding/updateCurrentSelectData',
          payload: item,
        });
      },
    };

    const onBlur = () => {
      const fields = getFieldsValue();
      const {
        xingming,
        lianxirenXm,
        lianxirenDh,
      } = fields;
      if (xingming && lianxirenXm && lianxirenDh) {
        dispatch({
          type: 'yuding/getSuoyin',
          payload: {
            xingming,
            lianxirenXm,
            lianxirenDh,
            zhuangtai: -1,
          },
          callback: (data) => {
            if (data.length > 0 && !editData.suoyin) {
              dispatch({
                type: 'yuding/showSelectModal',
              });
            }
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

    const chuangweiModalProps = {
      visible: chuangweiModalVisible,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      screen: 2,
      suoyin: editData && editData.suoyin,
    };

    const recordProps = {
      type: 'yuding',
      list: editData && editData.genzong,
      chuzhiDzRadio,
    };

    const changeChuzhiDz = (val) => {
      const {target: {value}} = val;
      dispatch({
        type: 'yuding/changeChuzhiDz',
        payload: value,
      });
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
        defaultDate={this.state.ruzhuDate ? new Date(moment(this.state.ruzhuDate).format('YYYY-MM-DD HH:mm')) : new Date()}
        mode="datetime"
      />
    );

    const datePicker2 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.jiezhiDate ? new Date(moment(this.state.jiezhiDate).format('YYYY-MM-DD HH:mm')) : new Date()}
        mode="datetime"
      />
    );

    let louhao = savaChuangwei.length > 0 && savaChuangwei[0].louhao;
    let louceng = savaChuangwei.length > 0 && savaChuangwei[0].louceng;
    let fanghao = savaChuangwei.length > 0 && savaChuangwei[0].fanghao;
    let chuanghao = savaChuangwei.length > 0 && savaChuangwei[0].chuanghao;
    let initChuangwei = louhao ? savaChuangwei.length > 1 ? `${louhao}楼${louceng}层${fanghao}房` : `${louhao}楼${louceng}层${fanghao}房${chuanghao}床` : '';

    return (
      <div className="content-inner">
        <div className="add-wrap">
          <div className="header">
            <div className="navGroup">
              <Row className="nav">
                <Col className="title">修改预定单</Col>
                <Col className="navBtn">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      onBack(1);
                    }}
                  ><JXRSIcon type="left"/> 返回</Button>
                  <Permissions all="sys:yuding:edit">
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
          <div className="mainRaw">
            <Form className="add-form" style={{padding: '28px 0'}}>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="本次处置动作">
                    {getFieldDecorator('chuzhiDz', {
                      initialValue: 2,
                      rules: [
                        {required: true, message: '请选择处置动作'},
                      ],
                    })(<RadioGroup className="op-radio-group" onChange={(val) => { changeChuzhiDz(val); }}>
                      {
                        fieldsChuzhiDz(editData && editData.zhuangtai).map((item, index) => {
                          return (<Radio
                            className={editData && (editData.zhuangtai === 2 || editData.zhuangtai === 3) && (index === 1) && CSS.chuzhiActive}
                            key={item.id}
                            value={item.id}
                          >{item.value}</Radio>);
                        })
                      }
                    </RadioGroup>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="本次处置情况">
                    {getFieldDecorator('chuzhiQk', {
                      initialValue: '',
                      rules: [
                      ],
                    })(<TextArea rows={3} placeholder="请输入本次处置情况"/>)}
                  </FormItem>
                </Col>
              </Row>

              <div className={styles.border} />

              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="预定单编号">
                    {getFieldDecorator('bianhao', {
                      initialValue: editData && editData.bianhao,
                      rules: [
                      ],
                    })(<Input disabled placeholder="请输入预定单编号"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="护理等级">
                    {getFieldDecorator('huliDj', {
                      initialValue: editData && editData.huliDj ? String(editData.huliDj) : '',
                      rules: [
                      ],
                    })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择护理等级">{allHulidengji.map((k) => {
                      return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                    })}</Select>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem className={CSS.dateFormItem} {...formItemLayout} label="入住时间">
                    {getFieldDecorator('ruzhuSj', {
                      initialValue: editData && editData.ruzhuSj ? moment(editData.ruzhuSj, 'YYYY-MM-DD HH:mm:ss').toDate() : undefined,
                      rules: [
                      ],
                    })(<PopPicker
                      datePicker={datePicker}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择日期"
                      date={this.state.ruzhuDate}
                      okText="确认"
                      dismissText="取消"
                      onChange={(date) => {
                        this.setState({
                          ruzhuDate: date,
                        });
                      }}
                    >
                      <Button>{this.state.ruzhuDate ? moment(this.state.ruzhuDate).format('YYYY-MM-DD HH:mm') : '请选择入住时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem className={CSS.dateFormItem} required {...formItemLayout} label="截止时间">
                    {getFieldDecorator('jiezhiSj', {
                      initialValue: editData && editData.jiezhiSj ? moment(editData.jiezhiSj, 'YYYY-MM-DD HH:mm').toDate() : undefined,
                      rules: [
                        {required: true, message: '请选择截止时间'},
                      ],
                    })(<PopPicker
                      datePicker={datePicker2}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择日期"
                      date={this.state.jiezhiDate}
                      okText="确认"
                      dismissText="取消"
                      onChange={(date) => {
                        this.setState({
                          jiezhiDate: date,
                        });
                      }}
                    >
                      <Button>{this.state.jiezhiDate ? moment(this.state.jiezhiDate).format('YYYY-MM-DD HH:mm') : '请选择截止时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="休养员姓名">
                    {getFieldDecorator('xingming', {
                      initialValue: editData && editData.xingming,
                      rules: [
                        {required: true, message: '请输入休养员姓名'},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder="请选择休养员姓名" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="联系人姓名">
                    {getFieldDecorator('lianxirenXm', {
                      initialValue: editData && editData.lianxirenXm,
                      rules: [
                        {required: true, message: '请输入联系人姓名'},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder="请输入联系人姓名"/>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="联系人电话">
                    {getFieldDecorator('lianxirenDh', {
                      initialValue: editData && editData.lianxirenDh,
                      rules: [
                        {required: true, message: '请输入联系人电话'},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder="请输入联系人电话"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="预定床位">
                    <Button
                      className={CSS.sleectChuangwei}
                      onClick={() => {
                        addChuangwei();
                      }}
                    >{initChuangwei || '选择床位' }</Button>
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="休养员性别">
                    {getFieldDecorator('xingbie', {
                      initialValue: editData && editData.xingbie ? String(editData.xingbie) : '',
                      rules: [
                      ],
                    })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择休养员性别">{allXingbie.map((k) => {
                      return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                    })}</Select>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="休养员年龄">
                    {getFieldDecorator('nianling', {
                      initialValue: (editData && editData.nianling) || '',
                      rules: [
                        {pattern: /^[0-9]+$/, message: '请输入正确的年龄'},
                      ],
                    })(<Input placeholder="请选择休养员年龄"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="休养员情况">
                    {getFieldDecorator('jibenQk', {
                      initialValue: editData && editData.jibenQk,
                      rules: [
                      ],
                    })(<TextArea rows={4} placeholder="请输入休养员情况" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="预定责任人">
                    {getFieldDecorator('zerenrenXm', {
                      initialValue: editData && editData.zerenren ? editData.zerenren : undefined,
                      rules: [
                      ],
                    })(<Select placeholder="请选择预定责任人" onChange={(val) => { setZerenrenDh(val); }}>
                      {yuangongList.map((k) => {
                        return <Option key={`${k.id}_${k.xingming}_${k.shouji}`} value={k.id}>{`${k.xingming}-${k.shouji}`}</Option>;
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="责任人电话">
                    {getFieldDecorator('zerenrenDh', {
                      initialValue: editData && editData.zerenrenDh,
                      rules: [
                      ],
                    })(<Input placeholder="请输入责任人电话"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="备注">
                    {getFieldDecorator('beizhu', {
                      initialValue: editData && editData.beizhu,
                      rules: [
                      ],
                    })(<TextArea rows={4} placeholder="请输入备注" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="处置状态">
                    {getFieldDecorator('zhuangtai', {
                      initialValue: editData && String(editData.zhuangtai),
                      rules: [
                      ],
                    })(<Select disabled placeholder="请选择处置状态">{yuyueStatus.map((k) => {
                      return <Option key={k.id} value={String(k.id)}>{k.value}</Option>;
                    })}</Select>)}
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Record {...recordProps} />
          </div>
        </div>
        <SelectModal {...selectModalProps} />
        <ChuangweiModal {...chuangweiModalProps} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    yuding: state.yuding,
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
