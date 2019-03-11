import React from 'react';
import queryString from 'query-string';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import {routerRedux} from 'dva/router';
import {Button, Col, Form, Input, message, Radio, Row, Select} from 'antd';
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

const formItemLayout3 = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 15,
  },
  style: {
  },
};

const formItemLayout4 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
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
  value: '入住',
}, {
  id: 4,
  value: '出院',
}, {
  id: 5,
  value: '作废',
}];

const ruyuanStatus = [
  {id: 1, value: '待入住'},
  {id: 2, value: '已入住'},
  {id: 3, value: '已离院'},
  {id: 4, value: '已作废'},
];

const fieldsChuzhiDz = (state) => {
  let newList = chuzhiDzRadio.filter((item) => {
    if (state === 1) {
      return item.id !== 4 && item.id !== 1;
    } else if (state === 2) {
      return item.id !== 3 && item.id !== 5;
    } else if (state === 3) {
      return item.id === 2 || item.id === 3;
    } else if (state === 4) {
      return item.id === 1 || item.id === 2;
    }
    return item;
  });
  if (state === 2) {
    newList.splice(1, 1);
    newList.push({id: 1, value: '办理'});
  }
  return newList;
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yudingDate: null,
      yujiDate: null,
      shijiDate: null,
    };
  }

  componentWillReceiveProps(newProps) {
    const {ruyuan} = this.props;
    const {editData} = ruyuan;
    if ((editData && editData.beforeChuangweiLx === null) && ((newProps.ruyuan.editData && newProps.ruyuan.editData.yudingRq) || (newProps.ruyuan.editData && newProps.ruyuan.editData.yujiSj) || (newProps.ruyuan.editData.shijiSj))) {
      this.setState({
        yudingDate: newProps.ruyuan.editData.yudingRq ? moment(newProps.ruyuan.editData.yudingRq, 'YYYY-MM-DD HH:mm:ss').toDate() : null,
        yujiDate: newProps.ruyuan.editData.yujiSj ? moment(newProps.ruyuan.editData.yujiSj, 'YYYY-MM-DD HH:mm:ss').toDate() : null,
        shijiDate: newProps.ruyuan.editData.shijiSj ? moment(newProps.ruyuan.editData.shijiSj, 'YYYY-MM-DD HH:mm:ss').toDate() : null,
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
        getFieldDecorator,
        validateFields,
        setFieldsValue,
      },
      ruyuan: {
        selectModalVisible,
        chuangweiModalVisible,
        selectData,
        editData,
        yuangongList,
        currentSelectData,
        savaChuangwei,
      },
      app: {
        isFormChange,
        allXingbie,
        allHulidengji,
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

    const selectModalProps = {
      width: 744,
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
            nianling: fields.nianling ? fields.nianling : nianling,
            xingbie: fields.xingbie ? String(fields.xingbie) : String(xingbie),
          });
        }
        dispatch({
          type: 'ruyuan/hideSelectModal',
        });
      },
      onCancel () {
        dispatch({
          type: 'ruyuan/hideSelectModal',
        });
      },
      onSelect(item) {
        dispatch({
          type: 'ruyuan/updateCurrentSelectData',
          payload: item,
        });
      },
    };

    const addChuangwei = () => {
      let params = {
        screen: 4,
        suoyin: editData && editData.suoyin,
      };
      dispatch({
        type: 'ruyuan/getChuangwei',
        payload: {
          ...params,
        },
        callback: (data) => {
          dispatch({
            type: 'ruyuan/showChuangweiModal',
          });
        },
      });
    };

    const resetChuangwei = () => {
      dispatch({
        type: 'ruyuan/resetChuangwei',
        payload: {},
      });
    };

    const onBlur = () => {
      const fields = getFieldsValue();
      const {
        xingming,
        jianhurenXm,
        jianhurenDh,
      } = fields;
      if (xingming && jianhurenXm && jianhurenDh) {
        dispatch({
          type: 'ruyuan/getSuoyin',
          payload: {
            xingming,
            lianxirenXm: jianhurenXm,
            lianxirenDh: jianhurenDh,
            zhuangtai: -1,
          },
          callback: (data) => {
            if (data.length > 0 && !editData.suoyin) {
              dispatch({
                type: 'ruyuan/showSelectModal',
              });
            }
          },
        });
      }
    };

    const save = () => {
      validateFields((errors) => {
        const fields = getFieldsValue();
        if (errors) {
          return;
        }
        const {
          yujiSj,
          shijiSj,
          yudingRq,
          zerenyishiXm,
          huliyuanXm,
          fuzerenXm,
        } = fields;
        let newFields = filterObj({...fields});
        let params = {
          ...newFields,
          id: Number(query.id),
          suoyin: Number(editData.suoyin),
          chuangweiLx: editData.chuangweiLx || undefined,
          baofang: 1,
          zhuangtai: Number(newFields.zhuangtai),
          zerenyishiXm: zerenyishiXm ? yuangongList.filter((item) => {
            return zerenyishiXm === item.id;
          })[0].xingming : undefined,
          zerenyishi: zerenyishiXm,
          huliyuanXm: huliyuanXm ? yuangongList.filter((item) => {
            return huliyuanXm === item.id;
          })[0].xingming : undefined,
          huliyuan: huliyuanXm,
          fuzerenXm: fuzerenXm ? yuangongList.filter((item) => {
            return fuzerenXm === item.id;
          })[0].xingming : undefined,
          fuzeren: fuzerenXm,
        };
        if (yudingRq) {
          params.yudingRq = moment(yudingRq).format('YYYY-MM-DD');
        }
        if (yujiSj) {
          params.yujiSj = moment(yujiSj).format('YYYY-MM-DD HH:mm:ss');
        }
        if (shijiSj) {
          params.shijiSj = moment(shijiSj).format('YYYY-MM-DD HH:mm:ss');
        }
        if (fields.nianling) {
          params.nianling = Number(fields.nianling);
        }
        if (savaChuangwei.length > 0) {
          params.chuangwei = savaChuangwei;
          params.baofang = savaChuangwei[0].baofang;
        } else {
          params.chuangwei = [];
        }
        if (Number(fields.chuzhiDz) === 3 && Number(savaChuangwei.length) <= 0) {
          message.error('办理入院必须选择床位');
          return;
        }
        dispatch({
          type: 'ruyuan/modifyRuyuan',
          payload: {
            ...params,
          },
          callback: (data) => {
            history.goBack();
          },
        });
      });
    };

    const recordProps = {
      type: 'shenqing',
      list: editData && editData.genzong,
      chuzhiDzRadio,
    };

    const chuangweiModalProps = {
      visible: chuangweiModalVisible,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      screen: 4,
      suoyin: editData && editData.suoyin,
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

    const setZerenyishiDh = (val) => {
      setFieldsValue({
        zerenyishiDh: yuangongList.filter((item) => {
          return item.id === val;
        })[0].shouji,
      });
    };

    const setHuliyuanDh = (val) => {
      setFieldsValue({
        huliyuanDh: yuangongList.filter((item) => {
          return item.id === val;
        })[0].shouji,
      });
    };

    const setFuzerenDh = (val) => {
      setFieldsValue({
        fuzerenDh: yuangongList.filter((item) => {
          return item.id === val;
        })[0].shouji,
      });
    };

    const isActive = (index) => {
      let state = false;
      let chuzhiArray = fieldsChuzhiDz(editData && editData.zhuangtai);
      if (editData && (editData.zhuangtai === 2 || editData.zhuangtai === 3 || editData.zhuangtai === 4) && index === Number(chuzhiArray.length - 1)) {
        state = true;
      }
      return state;
    };

    const changeChuzhiDz = (val) => {
      const {target: {value}} = val;
      dispatch({
        type: 'ruyuan/changeChuzhiDz',
        payload: value,
      });
    };

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.yudingDate ? moment(this.state.yudingDate, 'YYYY-MM-DD').toDate() : new Date()}
        mode="date"
      />
    );

    const datePicker2 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.yujiDate ? moment(this.state.yujiDate, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
        mode="datetime"
      />
    );

    const datePicker3 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.shijiDate ? moment(this.state.shijiDate, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
        mode="datetime"
      />
    );

    let louhao = savaChuangwei.length > 0 && savaChuangwei[0].louhao;
    let louceng = savaChuangwei.length > 0 && savaChuangwei[0].louceng;
    let fanghao = savaChuangwei.length > 0 && savaChuangwei[0].fanghao;
    let chuanghao = savaChuangwei.length > 0 && savaChuangwei[0].chuanghao;
    let initChuangwei = louhao ? savaChuangwei.length > 1 ? `${louhao}楼${louceng}层${fanghao}房` : `${louhao}楼${louceng}层${fanghao}房${chuanghao}床${editData && editData.chuangweiLx === 1 ? '（动态床位）' : ''}` : '';

    return (
      <div className="content-inner">
        <div className="add-wrap">
          <div className="header">
            <div className="navGroup">
              <Row className="nav">
                <Col className="title">修改入院申请单</Col>
                <Col className="navBtn">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      onBack(1);
                    }}
                  ><JXRSIcon type="left"/> 返回</Button>
                  <Permissions all="sys:shenqing:edit">
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
            <Form className="add-form" style={{padding: '28px 5px'}}>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Yuyue.chuzhiDz')}>
                    {getFieldDecorator('chuzhiDz', {
                      initialValue: 2,
                      rules: [
                        {required: true, message: intl.get('Yuyue.chuzhiDz.message')},
                      ],
                    })(<RadioGroup className="op-radio-group" onChange={(val) => { changeChuzhiDz(val); }}>
                      {
                        fieldsChuzhiDz(editData && editData.zhuangtai).map((item, index) => {
                          return (<Radio
                            className={isActive(index) && CSS.chuzhiActive}
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
                  <FormItem {...formItemLayout} label={intl.get('Yuyue.bencichuzhiQk')}>
                    {getFieldDecorator('chuzhiQk', {
                      initialValue: '',
                      rules: [
                      ],
                    })(<TextArea rows={3} placeholder={intl.get('Yuyue.chuzhiQk.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>

              <div className={styles.border} />
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.bianhao')}>
                    {getFieldDecorator('bianhao', {
                      initialValue: editData && editData.bianhao,
                      rules: [
                      ],
                    })(<Input disabled placeholder={intl.get('Ruyuan.bianhao.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliDj')}>
                    {getFieldDecorator('huliDj', {
                      initialValue: editData && editData.huliDj ? String(editData.huliDj) : undefined,
                      rules: [
                      ],
                    })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder={intl.get('Ruyuan.huliDj.placeholder')}>{allHulidengji.map((k) => {
                      return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                    })}</Select>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.yudingRq')}>
                    {getFieldDecorator('yudingRq', {
                      initialValue: editData && editData.yudingRq ? moment(editData.yudingRq, 'YYYY-MM-DD').toDate() : undefined,
                      rules: [
                      ],
                    })(<PopPicker
                      datePicker={datePicker}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择日期"
                      date={this.state.yudingDate}
                      okText="确认"
                      dismissText="取消"
                      onChange={(date) => {
                        this.setState({
                          yudingDate: date,
                        });
                      }}
                    >
                      <Button>{this.state.yudingDate ? moment(this.state.yudingDate).format('YYYY-MM-DD') : '请选择预定日期'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.yujiSj')}>
                    {getFieldDecorator('yujiSj', {
                      initialValue: editData && editData.yujiSj ? moment(editData.yujiSj, 'YYYY-MM-DD HH:mm:ss').toDate() : undefined,
                      rules: [
                      ],
                    })(<PopPicker
                      datePicker={datePicker2}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择日期"
                      date={this.state.yujiDate}
                      okText="确认"
                      dismissText="取消"
                      onChange={(date) => {
                        this.setState({
                          yujiDate: date,
                        });
                      }}
                    >
                      <Button>{this.state.yujiDate ? moment(this.state.yujiDate).format('YYYY-MM-DD HH:mm') : '请选择预计入院时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.shijiSj')}>
                    {getFieldDecorator('shijiSj', {
                      initialValue: editData && editData.shijiSj ? moment(editData.shijiSj, 'YYYY-MM-DD HH:mm:ss').toDate() : undefined,
                      rules: [
                      ],
                    })(<PopPicker
                      datePicker={datePicker3}
                      transitionName="rmc-picker-popup-slide-fade"
                      maskTransitionName="rmc-picker-popup-fade"
                      title="选择日期"
                      date={this.state.shijiDate}
                      okText="确认"
                      dismissText="取消"
                      onChange={(date) => {
                        this.setState({
                          shijiDate: date,
                        });
                      }}
                    >
                      <Button>{this.state.shijiDate ? moment(this.state.shijiDate).format('YYYY-MM-DD HH:mm') : '请选择实际入院时间'}</Button>
                    </PopPicker>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.xingming')}>
                    {getFieldDecorator('xingming', {
                      initialValue: editData && editData.xingming,
                      rules: [
                        {required: true, message: intl.get('Ruyuan.xingming.message')},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.xingming.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jianhurenXm')}>
                    {getFieldDecorator('jianhurenXm', {
                      initialValue: editData && editData.jianhurenXm,
                      rules: [
                        // {required: true, message: intl.get('Ruyuan.jianhurenXm.message')},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.jianhurenXm.placeholder')} />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jianhurenDh')}>
                    {getFieldDecorator('jianhurenDh', {
                      initialValue: editData && editData.jianhurenDh,
                      rules: [
                        // {required: true, message: intl.get('Ruyuan.jianhurenDh.message')},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.jianhurenDh.placeholder')} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}} gutter={10}>
                <Col span={20}>
                  <FormItem {...formItemLayout4} label="床位">
                    <Button
                      className={CSS.sleectChuangwei}
                      onClick={() => {
                        addChuangwei();
                      }}
                    >{initChuangwei || '选择床位' }</Button>
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem>
                    <Button
                      className={CSS.sleectChuangwei}
                      onClick={() => {
                        resetChuangwei();
                      }}
                    >重置床位</Button>
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.xingbie')}>
                    {getFieldDecorator('xingbie', {
                      initialValue: editData && editData.xingbie ? String(editData.xingbie) : undefined,
                      rules: [
                      ],
                    })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择休养员性别">{allXingbie.map((k) => {
                      return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                    })}</Select>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jiguan')}>
                    {getFieldDecorator('jiguan', {
                      initialValue: editData && editData.jiguan,
                      rules: [
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.jiguan.placeholder')} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.shenfenzheng')}>
                    {getFieldDecorator('shenfenzheng', {
                      initialValue: editData && editData.shenfenzheng,
                      rules: [
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.shenfenzheng.placeholder')} />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.nianling')}>
                    {getFieldDecorator('nianling', {
                      initialValue: (editData && editData.nianling) || '',
                      rules: [
                        {pattern: /^[0-9]+$/, message: '请输入正确的年龄'},
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.nianling.placeholder')} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.yibaoQk')}>
                    {getFieldDecorator('yibaoQk', {
                      initialValue: editData && editData.yibaoQk,
                      rules: [
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.yibaoQk.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.bingshiQk')}>
                    {getFieldDecorator('bingshiQk', {
                      initialValue: editData && editData.bingshiQk,
                      rules: [
                      ],
                    })(<TextArea rows={3} placeholder={intl.get('Ruyuan.bingshiQk.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.qitaQk')}>
                    {getFieldDecorator('qitaQk', {
                      initialValue: editData && editData.qitaQk,
                      rules: [
                      ],
                    })(<TextArea rows={3} placeholder={intl.get('Ruyuan.qitaQk.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.teshuZysx')}>
                    {getFieldDecorator('teshuZysx', {
                      initialValue: editData && editData.teshuZysx,
                      rules: [
                      ],
                    })(<TextArea rows={3} placeholder={intl.get('Ruyuan.teshuZysx.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.zerenyishiXm')}>
                    {getFieldDecorator('zerenyishiXm', {
                      initialValue: editData && editData.zerenyishi ? editData.zerenyishi : undefined,
                      rules: [
                      ],
                    })(<Select placeholder="请选择责任医师" onChange={(val) => { setZerenyishiDh(val); }}>
                      {yuangongList.map((k) => {
                        return <Option key={`${k.id}_${k.xingming}_${k.shouji}`} value={k.id}>{`${k.xingming}-${k.shouji}`}</Option>;
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.zerenyishiDh')}>
                    {getFieldDecorator('zerenyishiDh', {
                      initialValue: editData && editData.zerenyishiDh,
                      rules: [
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.zerenyishiDh.placeholder')} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliyuanXm')}>
                    {getFieldDecorator('huliyuanXm', {
                      initialValue: editData && editData.huliyuan ? editData.huliyuan : undefined,
                      rules: [
                      ],
                    })(<Select placeholder="请选择护理员" onChange={(val) => { setHuliyuanDh(val); }}>
                      {yuangongList.map((k) => {
                        return <Option key={`${k.id}_${k.xingming}_${k.shouji}`} value={k.id}>{`${k.xingming}-${k.shouji}`}</Option>;
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliyuanDh')}>
                    {getFieldDecorator('huliyuanDh', {
                      initialValue: editData && editData.huliyuanDh,
                      rules: [
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.huliyuanDh.placeholder')} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.fuzerenXm')}>
                    {getFieldDecorator('fuzerenXm', {
                      initialValue: editData && editData.fuzeren ? editData.fuzeren : undefined,
                      rules: [
                      ],
                    })(<Select placeholder="请选择养护部负责人" onChange={(val) => { setFuzerenDh(val); }}>
                      {yuangongList.map((k) => {
                        return <Option key={`${k.id}_${k.xingming}_${k.shouji}`} value={k.id}>{`${k.xingming}-${k.shouji}`}</Option>;
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem className="lineFeedForm" {...formItemLayout} label={intl.get('Ruyuan.fuzerenDh')}>
                    {getFieldDecorator('fuzerenDh', {
                      initialValue: editData && editData.fuzerenDh,
                      rules: [
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.fuzerenDh.placeholder')}/>)}
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
                    })(<Select disabled placeholder="请选择处置状态">{ruyuanStatus.map((k) => {
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
