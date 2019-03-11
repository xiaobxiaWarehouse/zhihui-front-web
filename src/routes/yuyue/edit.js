import React from 'react';
import queryString from 'query-string';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import {Button, Col, Form, Input, Radio, Row, Select} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import styles from './index.less';
import SelectModal from './SelectModal';

const CSS = Layout.styles;
const {Record} = Layout;
const FormItem = Form.Item;
const {Option} = Select;
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
  value: '新增',
}, {
  id: 3,
  value: '反馈',
}, {
  id: 4,
  value: '完成',
}, {
  id: 5,
  value: '作废',
}];

const yuyueStatus = [
  {id: 1, value: '待反馈'},
  {id: 2, value: '待处理'},
  {id: 3, value: '已完成'},
  {id: 4, value: '已作废'},
];

const laiyuanValue = [
  {zhi: 1, zhongwen: '网站'},
  {zhi: 2, zhongwen: '报纸'},
  {zhi: 3, zhongwen: '媒体'},
  {zhi: 4, zhongwen: '公众号'},
  {zhi: 5, zhongwen: '熟人'},
  {zhi: 6, zhongwen: '其他'},
];

const fieldsChuzhiDz = (state) => {
  let newList = chuzhiDzRadio.filter((item) => {
    if (state === 1) {
      return item.id !== 4 && item.id !== 5 && item.id !== 1;
    } else if (state === 2) {
      return item.id !== 3;
    } else if (state === 3 || state === 4) {
      return item.id === 3 || item.id === 2;
    }
    return item;
  });
  if (state === 2) {
    newList.splice(1, 1);
    newList.push({id: 1, value: '新增'});
  }
  return newList;
};

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  componentWillReceiveProps(newProps) {
    const {yuyue} = this.props;
    const {editData} = yuyue;
    if ((editData === null) && newProps.yuyue.editData && newProps.yuyue.editData.canguanSj) {
      this.setState({
        date: moment(newProps.yuyue.editData.canguanSj, 'YYYY-MM-DD HH:mm:ss').toDate(),
      });
    }
  }

  render () {
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
      yuyue: {
        selectModalVisible,
        selectData,
        yuangongList,
        currentSelectData,
        editData,
      },
      app: {
        isFormChange,
        allXingbie,
      },
    } = this.props;

    const {search} = location;
    const query = queryString.parse(search);

    const save = () => {
      validateFields((errors) => {
        const fields = getFieldsValue();
        if (errors) {
          return;
        }
        if (fields.canguanSj || this.state.date) {
          fields.canguanSj = moment(fields.canguanSj || this.state.date).format('YYYY-MM-DD HH:mm:ss');
        }
        if (fields.nianling) {
          fields.nianling = Number(fields.nianling);
        }
        if (currentSelectData && currentSelectData.suoyin) {
          fields.suoyin = currentSelectData.id;
        }
        fields.chuzhiDz = Number(fields.chuzhiDz);
        fields.zhuangtai = Number(fields.zhuangtai);
        if (editData && editData.suoyin) {
          fields.suoyin = editData.suoyin;
        }
        const {
          zerenrenXm,
        } = fields;
        dispatch({
          type: 'yuyue/modifyYuyue',
          payload: {
            ...fields,
            zerenrenXm: zerenrenXm ? yuangongList.filter((item) => {
              return zerenrenXm === item.id;
            })[0].xingming : undefined,
            zerenren: zerenrenXm,
            id: Number(query.id),
          },
          callback: () => {
            history.goBack();
          },
        });
      });
    };

    const recordProps = {
      type: 'yuyue',
      list: editData && editData.genzong,
      chuzhiDzRadio,
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
        if (currentSelectData && currentSelectData.suoyin) {
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
            type: 'yuyue/updataSelectSuoyin',
            payload: currentSelectData,
          });
        }
        dispatch({
          type: 'yuyue/hideSelectModal',
        });
      },
      onCancel () {
        dispatch({
          type: 'yuyue/hideSelectModal',
        });
      },
      onSelect(item) {
        dispatch({
          type: 'yuyue/updateCurrentSelectData',
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
          type: 'yuyue/getSuoyin',
          payload: {
            xingming,
            lianxirenXm,
            lianxirenDh,
            zhuangtai: -1,
          },
          callback: (data) => {
            if (data.length > 0 && editData && !editData.suoyin) {
              dispatch({
                type: 'yuyue/showSelectModal',
              });
            }
          },
        });
      }
    };


    const setZerenrenDh = (val) => {
      setFieldsValue({
        zerenrenDh: yuangongList.filter((item) => {
          return item.id === val;
        })[0].shouji,
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

    const isActive = (index) => {
      let state = false;
      let chuzhiArray = fieldsChuzhiDz(editData && editData.zhuangtai);
      if (editData && (editData.zhuangtai === 2 || editData.zhuangtai === 3 || editData.zhuangtai === 4) && index === Number(chuzhiArray.length - 1)) {
        state = true;
      }
      return state;
    };

    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={new Date(1700, 1, 1, 0, 0, 0)}
        maxDate={new Date(2060, 12, 31, 0, 0, 0)}
        mode="datetime"
        defaultDate={this.state.date ? moment(this.state.date, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
      />
    );
    return (
      <div className="content-inner">
        <div className="add-wrap">
          <div className="header">
            <div className="navGroup">
              <Row className="nav">
                <Col className="title">编辑预约单</Col>
                <Col className="navBtn">
                  <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={() => {
                      onBack(1);
                    }}
                  ><JXRSIcon type="left"/> 返回</Button>
                  <Permissions all="sys:yuyue:edit">
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
                  <FormItem {...formItemLayout} label={intl.get('Yuyue.chuzhiDz')}>
                    {getFieldDecorator('chuzhiDz', {
                      initialValue: 2,
                      rules: [
                        {required: true, message: intl.get('Yuyue.chuzhiDz.message')},
                      ],
                    })(<RadioGroup className="op-radio-group">
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
                  <FormItem {...formItemLayout} label="预约编号">
                    {getFieldDecorator('bianhao', {
                      initialValue: editData && editData.bianhao,
                      rules: [
                      ],
                    })(<Input disabled placeholder="请输入预约编号"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label="预约参观时间">
                    {getFieldDecorator('canguanSj', {
                      initialValue: editData && editData.canguanSj ? moment(editData.canguanSj, 'YYYY-MM-DD HH:mm:ss').toDate() : undefined,
                      rules: [
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
                      <Button>{this.state.date ? moment(this.state.date).format('YYYY-MM-DD HH:mm') : '请选择预约参观时间'}</Button>
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
                    })(<Input onBlur={() => { onBlur(); }} placeholder="请输入休养员姓名"/>)}
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
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="休养员性别">
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
                  <FormItem {...formItemLayout2} label="休养员年龄">
                    {getFieldDecorator('nianling', {
                      initialValue: editData && editData.nianling ? editData.nianling : undefined,
                      rules: [
                        {pattern: /^[0-9]+$/, message: '请输入正确的年龄'},
                      ],
                    })(<Input type="number" placeholder="请选择休养员年龄"/>)}
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
                    })(<TextArea rows={3} placeholder="请输入休养员情况"/>)}
                  </FormItem>
                </Col>
              </Row>
              <Row style={{padding: '0 28px'}}>
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="预约责任人">
                    {getFieldDecorator('zerenrenXm', {
                      initialValue: editData && editData.zerenren ? editData.zerenren : undefined,
                      rules: [
                      ],
                    })(<Select placeholder="请选择预约责任人" onChange={(val) => { setZerenrenDh(val); }}>
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
                <Col span={12}>
                  <FormItem {...formItemLayout2} label="来源">
                    {getFieldDecorator('laiyuan', {
                      initialValue: editData && editData.laiyuan,
                      rules: [
                      ],
                    })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} allowClear placeholder="请输入来源">{laiyuanValue.map((k, index) => {
                      let laiyuanIndex = index;
                      return <Option key={laiyuanIndex} value={String(k.zhongwen)}>{k.zhongwen}</Option>;
                    })}</Select>)}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    yuyue: state.yuyue,
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
