import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
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

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yudingDate: null,
      yujiDate: null,
      shijiDate: null,
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
      ruyuan: {
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
        allHulidengji,
        allXingbie,
      },
    } = this.props;

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
        if (currentSelectData && currentSelectData.suoyin) {
          const fields = getFieldsValue();
          const {
            nianling,
            xingbie,
            lianxirenXm,
            lianxirenDh,
            xingming,
          } = currentSelectData;
          setFieldsValue({
            xingming: fields.xingming || xingming,
            jianhurenXm: fields.jianhurenXm || lianxirenXm,
            jianhurenDh: fields.jianhurenDh || lianxirenDh,
            nianling: fields.nianling ? fields.nianling : nianling > 0 ? nianling : undefined,
            xingbie: fields.xingbie ? String(fields.xingbie) : xingbie ? String(xingbie) : undefined,
          });
          dispatch({
            type: 'ruyuan/updataSelectSuoyin',
            payload: currentSelectData,
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

    const suoyinModalProps = {
      width: 744,
      item: selectSuoyin,
      visible: suoyinModalVisible,
      maskClosable: false,
      title: '关联休养员信息',
      wrapClassName: 'vertical-center-modal',
      onCancelSuoyin() {
        dispatch({
          type: 'ruyuan/updataSelectSuoyin',
          payload: null,
        });
        dispatch({
          type: 'ruyuan/hideSuoyinModalVisible',
        });
        dispatch({
          type: 'ruyuan/initChuangweiSelectItem',
          payload: [],
        });
      },
      onCancel () {
        dispatch({
          type: 'ruyuan/hideSuoyinModalVisible',
        });
      },
    };

    const showSuoyinItem = () => {
      dispatch({
        type: 'ruyuan/showSuoyinModalVisible',
      });
    };

    const addChuangwei = () => {
      let params = {
        screen: 3,
        suoyin: selectSuoyin && selectSuoyin.suoyin,
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

    const chuangweiModalProps = {
      visible: chuangweiModalVisible,
      maskClosable: false,
      wrapClassName: 'vertical-center-modal',
      screen: 3,
      suoyin: selectSuoyin && selectSuoyin.suoyin,
    };

    const onBlur = () => {
      const fields = getFieldsValue();
      const {
        xingming,
        jianhurenXm,
        jianhurenDh,
      } = fields;
      if (!selectSuoyin) {
        if (xingming || jianhurenXm || jianhurenDh) {
          dispatch({
            type: 'ruyuan/getSuoyin',
            payload: {
              xingming,
              lianxirenXm: jianhurenXm,
              lianxirenDh: jianhurenDh,
              zhuangtai: -1,
            },
            callback: (data) => {
              if (data.length > 0) {
                dispatch({
                  type: 'ruyuan/showSelectModal',
                });
              }
            },
          });
        }
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
          zerenyishiXm,
          huliyuanXm,
          fuzerenXm,
          yudingRq,
        } = fields;
        let newFields = filterObj({...fields});
        let params = {
          ...newFields,
          chuangweiLx: 2,
          baofang: 1,
          zhuangtai: 1,
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
        if (selectSuoyin) {
          params.suoyin = selectSuoyin.suoyin;
        }
        params.ruzhuBl = -1;
        params.ruzhuPg = -1;
        params.tijianBg = -1;
        params.jiankangJl = -1;
        dispatch({
          type: 'ruyuan/addRuyuan',
          payload: {
            ...params,
          },
          callback: (data) => {
            dispatch({
              type: 'ruyuan/updateScrollTop',
              payload: 0,
            });
            dispatch(routerRedux.push({pathname: '/ruzhu/list'}));
          },
          failCallback: () => {
            message.error('该休养员已有相关入院申请单，请重新选择');
            dispatch({
              type: 'ruyuan/updataSelectSuoyin',
              payload: null,
            });
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
        defaultDate={this.state.yujiDate ? new Date(moment(this.state.yujiDate, 'YYYY-MM-DD HH:mm').toDate()) : new Date()}
        mode="datetime"
      />
    );

    const datePicker3 = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        defaultDate={this.state.shijiDate ? new Date(moment(this.state.shijiDate, 'YYYY-MM-DD HH:mm').toDate()) : new Date()}
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
                <Col className="title">新增入院申请单</Col>
                <Col className="navBtn">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      onBack(1);
                    }}
                  ><JXRSIcon type="left"/> 返回</Button>
                  <Permissions all="sys:shenqing:add">
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
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliDj')}>
                    {getFieldDecorator('huliDj', {
                      rules: [
                      ],
                    })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择护理等级">{allHulidengji.map((k) => {
                      return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                    })}</Select>)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.yudingRq')}>
                    {getFieldDecorator('yudingRq', {
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
                <Col span={20}>
                  <FormItem {...formItemLayout4} label={intl.get('Ruyuan.xingming')}>
                    {getFieldDecorator('xingming', {
                      rules: [
                        {required: true, message: intl.get('Ruyuan.xingming.message')},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.xingming.placeholder')}/>)}
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
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jianhurenXm')}>
                    {getFieldDecorator('jianhurenXm', {
                      rules: [
                        // {required: true, message: intl.get('Ruyuan.jianhurenXm.message')},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.jianhurenXm.placeholder')} />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jianhurenDh')}>
                    {getFieldDecorator('jianhurenDh', {
                      rules: [
                        // {required: true, message: intl.get('Ruyuan.jianhurenDh.message')},
                      ],
                    })(<Input onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.jianhurenDh.placeholder')} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="床位">
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
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.xingbie')}>
                    {getFieldDecorator('xingbie', {
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
                      rules: [
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.shenfenzheng.placeholder')} />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label={intl.get('Ruyuan.nianling')}>
                    {getFieldDecorator('nianling', {
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
                      rules: [
                      ],
                    })(<Input placeholder={intl.get('Ruyuan.fuzerenDh.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={intl.get('Ruyuan.chuzhiQk')}>
                    {getFieldDecorator('chuzhiQk', {
                      rules: [
                      ],
                    })(<TextArea rows={3} placeholder={intl.get('Ruyuan.chuzhiQk.placeholder')}/>)}
                  </FormItem>
                </Col>
              </Row>
              <SelectModal {...selectModalProps} />
              <ChuangweiModal {...chuangweiModalProps} />
              {
                suoyinModalVisible && <SuoyinModal {...suoyinModalProps} />
              }
            </Form>
          </div>
        </div>
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
