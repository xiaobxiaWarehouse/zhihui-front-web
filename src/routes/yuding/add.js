import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import SelectModal from './SelectModal';
import ChuangweiModal from './ChuangweiModal';
import SuoyinModal from './SuoyinModal';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
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
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
  style: {
  },
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruzhuDate: null,
      jiezhiDate: null,
    };
  }

  render() {
    const {
      dispatch,
      history,
      form: {
        getFieldsValue,
        getFieldDecorator,
        validateFields,
        setFieldsValue,
      },
      yuding: {
        selectModalVisible,
        chuangweiModalVisible,
        selectData,
        yuangongList,
        currentSelectData,
        selectSuoyin,
        suoyinModalVisible,
        savaChuangwei,
      },
      app: {
        isFormChange,
        allXingbie,
        allHulidengji,
      },
    } = this.props;

    const selectModalProps = {
      width: 744,
      list: selectData,
      visible: selectModalVisible,
      maskClosable: false,
      title: '存在疑似重复休养员，请选择',
      wrapClassName: 'vertical-center-modal',
      onOk () {
        if (currentSelectData && currentSelectData.suoyin) {
          const fields = getFieldsValue();
          const {
            nianling,
            xingbie,
            xingming,
            lianxirenXm,
            lianxirenDh,
          } = currentSelectData;
          setFieldsValue({
            xingming: fields.xingming || xingming,
            lianxirenDh: fields.lianxirenDh || lianxirenDh,
            lianxirenXm: fields.lianxirenXm || lianxirenXm,
            nianling: fields.nianling ? fields.nianling : nianling > 0 ? nianling : undefined,
            xingbie: fields.xingbie ? String(fields.xingbie) : xingbie ? String(xingbie) : undefined,
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

    const suoyinModalProps = {
      width: 744,
      item: selectSuoyin,
      visible: suoyinModalVisible,
      maskClosable: false,
      title: '关联休养员信息',
      wrapClassName: 'vertical-center-modal',
      onCancelSuoyin() {
        dispatch({
          type: 'yuding/updataSelectSuoyin',
          payload: null,
        });
        dispatch({
          type: 'yuding/hideSuoyinModalVisible',
        });
        dispatch({
          type: 'yuding/initChuangweiSelectItem',
          payload: [],
        });
      },
      onCancel () {
        dispatch({
          type: 'yuding/hideSuoyinModalVisible',
        });
      },
    };

    const showSuoyinItem = () => {
      dispatch({
        type: 'yuding/showSuoyinModalVisible',
      });
    };

    const addChuangwei = () => {
      let params = {
        screen: 1,
      };
      if (currentSelectData && currentSelectData.suoyin) {
        params.suoyin = selectSuoyin && selectSuoyin.suoyin;
      }
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

    const chuangweiModalProps = {
      visible: chuangweiModalVisible,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      screen: 1,
      suoyin: selectSuoyin && selectSuoyin.suoyin,
    };

    const save = () => {
      validateFields((errors) => {
        const fields = getFieldsValue();
        if (errors) {
          return;
        }
        const {
          ruzhuSj,
          jiezhiSj,
          zerenrenXm,
        } = fields;
        let params = {
          ...fields,
          zerenrenXm: zerenrenXm ? yuangongList.filter((item) => {
            return zerenrenXm === item.id;
          })[0].xingming : undefined,
          zerenren: zerenrenXm,
          chuangweiLx: 2,
          baofang: 1,
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
        if (selectSuoyin && selectSuoyin.suoyin) {
          params.suoyin = selectSuoyin.suoyin;
        }
        if (savaChuangwei.length > 0) {
          params.chuangwei = savaChuangwei;
          params.baofang = savaChuangwei[0].baofang;
        } else {
          params.chuangwei = [];
        }
        dispatch({
          type: 'yuding/addYuDing',
          payload: params,
          callback: () => {
            dispatch({
              type: 'yuding/updateScrollTop',
              payload: 0,
            });
            dispatch(routerRedux.push('/yuding/list'));
          },
          failCallback: () => {
            message.error('该休养员已有相关预定单，请重新选择');
            dispatch({
              type: 'yuding/updataSelectSuoyin',
              payload: null,
            });
          },
        });
      });
    };

    const onBlur = () => {
      const fields = getFieldsValue();
      const {
        xingming,
        lianxirenXm,
        lianxirenDh,
      } = fields;
      if (!selectSuoyin) {
        if (xingming || lianxirenXm || lianxirenDh) {
          dispatch({
            type: 'yuding/getSuoyin',
            payload: {
              xingming,
              lianxirenXm,
              lianxirenDh,
              zhuangtai: -1,
            },
            callback: (data) => {
              if (data.length > 0) {
                dispatch({
                  type: 'yuding/showSelectModal',
                });
              }
            },
          });
        }
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
                <Col className="title">新增预定单</Col>
                <Col className="navBtn">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      onBack('/yuding/list');
                    }}
                  ><JXRSIcon type="left"/> 返回</Button>
                  <Permissions all="sys:yuding:add">
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
                  <FormItem {...formItemLayout} label="护理等级">
                    {getFieldDecorator('huliDj', {
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
                  <FormItem {...formItemLayout} label="入住时间">
                    {getFieldDecorator('ruzhuSj', {
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
                  <FormItem required {...formItemLayout} label="截止时间">
                    {getFieldDecorator('jiezhiSj', {
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
                <Col span={20}>
                  <FormItem {...formItemLayout3} label="休养员姓名">
                    {getFieldDecorator('xingming', {
                      rules: [
                        {required: true, message: '请输入休养员姓名'},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder="请输入休养员姓名" />)}
                  </FormItem>
                </Col>
                <Col span={3} push={1}>
                  <Button
                    className={!selectSuoyin ? CSS.suoyinBtn : CSS.suoyinActive}
                    disabled={!selectSuoyin}
                    onClick={() => {
                      showSuoyinItem();
                    }}
                  >
                    {
                      selectSuoyin && selectSuoyin.suoyin ? '已关联' : '未关联'
                    }
                  </Button>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="联系人姓名">
                    {getFieldDecorator('lianxirenXm', {
                      rules: [
                        {required: true, message: '请输入联系人姓名'},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder="请输入联系人姓名"/>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="联系人电话">
                    {getFieldDecorator('lianxirenDh', {
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
                      rules: [
                        {pattern: /^[0-9]+$/, message: '请输入正确的年龄'},
                      ],
                    })(<Input type="number" placeholder="请输入休养员年龄"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="休养员情况">
                    {getFieldDecorator('jibenQk', {
                      rules: [
                      ],
                    })(<TextArea rows={4} placeholder="请输入休养员情况"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="预定责任人">
                    {getFieldDecorator('zerenrenXm', {
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
                      rules: [
                      ],
                    })(<TextArea rows={4} placeholder="请输入备注" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="处置情况">
                    {getFieldDecorator('chuzhiQk', {
                      rules: [
                      ],
                    })(<TextArea rows={4} placeholder="请输入处置情况" />)}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <SelectModal {...selectModalProps} />
        <ChuangweiModal {...chuangweiModalProps} />
        {
          suoyinModalVisible && <SuoyinModal {...suoyinModalProps} />
        }
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
