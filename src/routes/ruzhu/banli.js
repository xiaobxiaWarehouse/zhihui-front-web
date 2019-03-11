import React from 'react';
import queryString from 'query-string';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import {routerRedux} from 'dva/router';
import {Button, Checkbox, Col, Form, Input, Row, Select, DatePicker, TimePicker} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import styles from './index.less';

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
    span: 8,
  },
  wrapperCol: {
    span: 15,
  },
  style: {
  },
};

const Add = (props) => {
  const {
    dispatch,
    history,
    form: {
      getFieldDecorator,
    },
    ruyuan: {
      chuangweiSelectItem,
      editData,
      banlibumen,
    },
    app: {
      isFormChange,
      allHulidengji,
      allXingbie,
    },
    location,
  } = props;

  const filterObj = (obj) => {
    let newObj = {};
    for (let item in obj) {
      if (obj[item]) {
        newObj[item] = obj[item];
      }
    }
    return newObj;
  };

  const {search} = location;
  const query = queryString.parse(search);

  const save = () => {
    dispatch({
      type: 'ruyuan/modifyBanli',
      payload: {
        shenqingId: query.id,
        banliJl: banlibumen,
      },
      callback: () => {
        history.goBack();
      },
    });
  };

  const changeBumenStatus = (index) => {
    dispatch({
      type: 'ruyuan/changeBumenStatus',
      payload: index,
    });
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
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

  let yudingRq = editData && editData.yudingRq;
  let yujiSjA = editData && editData.yujiSj;
  let yujiSjB = editData && editData.yujiSj;
  let shijiSjA = editData && editData.shijiSj;
  let shijiSjB = editData && editData.shijiSj;
  let initYudingRq;
  let initYujiSjA;
  let initYujiSjB;
  let initShijiSjA;
  let initShijiSjB;
  if (yudingRq) {
    initYudingRq = moment(yudingRq, 'YYYY-MM-DD');
  }
  if (yujiSjA) {
    initYujiSjA = moment(yujiSjA, 'YYYY-MM-DD');
  }
  if (yujiSjB) {
    initYujiSjB = moment(yujiSjB, 'YYYY-MM-DD HH:mm:ss');
  }
  if (shijiSjA) {
    initShijiSjA = moment(shijiSjA, 'YYYY-MM-DD');
  }
  if (shijiSjB) {
    initShijiSjB = moment(shijiSjB, 'YYYY-MM-DD HH:mm:ss');
  }

  let louhao = chuangweiSelectItem.length > 0 && chuangweiSelectItem[0].louhao;
  let louceng = chuangweiSelectItem.length > 0 && chuangweiSelectItem[0].louceng;
  let fanghao = chuangweiSelectItem.length > 0 && chuangweiSelectItem[0].fanghao;
  let chuanghao = chuangweiSelectItem.length > 0 && chuangweiSelectItem[0].chuanghao;
  let initChuangwei = louhao ? chuangweiSelectItem.length > 1 ? `${louhao}楼${louceng}层${fanghao}房` : `${louhao}楼${louceng}层${fanghao}房${chuanghao}床${editData && editData.chuangweiLx === 1 ? '（动态床位）' : ''}` : '';

  return (
    <div className="content-inner">
      <div className="add-wrap">
        <div className="header">
          <div className="navGroup">
            <Row className="nav">
              <Col className="title">入院办理</Col>
              <Col className="navBtn">
                <Button
                  type="primary"
                  style={{marginRight: 10}}
                  onClick={() => {
                    onBack(1);
                  }}
                ><JXRSIcon type="left"/> 返回</Button>
                <Permissions all="sys:banli:edit">
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
            <Row type="flex" justify="space-between" style={{paddingLeft: 28, paddingRight: 28, marginBottom: 28}}>
              {
                banlibumen.map((item, index) => {
                  return (
                    <Col key={item.bumen}>
                      <Checkbox
                        checked={item.banli === 2}
                        className={styles.bumengCheckbox}
                        onChange={(val) => {
                          changeBumenStatus(index);
                        }}
                      >{item.miaoshu}</Checkbox>
                    </Col>
                  );
                })
              }
            </Row>

            <div className={styles.border}/>

            <Row style={{padding: '0 28px'}}>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliDj')}>
                  {getFieldDecorator('huliDj', {
                    initialValue: editData && editData.huliDj ? String(editData.huliDj) : '',
                    rules: [
                    ],
                  })(<Select disabled getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择护理等级">{allHulidengji.map((k) => {
                    return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                  })}</Select>)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.yudingRq')}>
                  {getFieldDecorator('yudingRq', {
                    initialValue: initYudingRq,
                    rules: [
                    ],
                  })(<DatePicker disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" placeholder="" />)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={15}>
                <FormItem {...formItemLayout3} label={intl.get('Ruyuan.yujiSj')}>
                  {getFieldDecorator('yujiSjA', {
                    initialValue: initYujiSjA,
                    rules: [
                    ],
                  })(<DatePicker disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" placeholder="" />)}
                </FormItem>
              </Col>
              <Col span={9}>
                <FormItem>
                  {getFieldDecorator('yujiSjB', {
                    initialValue: initYujiSjB,
                    rules: [
                    ],
                  })(<TimePicker disabled className={CSS.datePicker} getPopupContainer={triggerNode => triggerNode.parentNode} format="HH:mm" placeholder="" />)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={15}>
                <FormItem {...formItemLayout3} label={intl.get('Ruyuan.shijiSj')}>
                  {getFieldDecorator('shijiSjA', {
                    initialValue: initShijiSjA,
                    rules: [
                    ],
                  })(<DatePicker disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" placeholder="" />)}
                </FormItem>
              </Col>
              <Col span={9}>
                <FormItem>
                  {getFieldDecorator('shijiSjB', {
                    initialValue: initShijiSjB,
                    rules: [
                    ],
                  })(<TimePicker disabled className={CSS.datePicker} getPopupContainer={triggerNode => triggerNode.parentNode} format="HH:mm" placeholder="" />)}
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
                  })(<Input disabled onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.xingming.placeholder')}/>)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.xingbie')}>
                  {getFieldDecorator('xingbie', {
                    initialValue: editData && editData.xingbie ? String(editData.xingbie) : '',
                    rules: [
                    ],
                  })(<Select disabled getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择休养员性别">{allXingbie.map((k) => {
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
                  })(<Input disabled placeholder={intl.get('Ruyuan.jiguan.placeholder')} />)}
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
                  })(<Input disabled placeholder={intl.get('Ruyuan.shenfenzheng.placeholder')} />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.nianling')}>
                  {getFieldDecorator('nianling', {
                    initialValue: editData && editData.nianling,
                    rules: [
                      {pattern: /^[0-9]+$/, message: '请输入正确的年龄'},
                    ],
                  })(<Input disabled placeholder={intl.get('Ruyuan.nianling.placeholder')} />)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jianhurenXm')}>
                  {getFieldDecorator('jianhurenXm', {
                    initialValue: editData && editData.jianhurenXm,
                    rules: [
                      {required: true, message: intl.get('Ruyuan.jianhurenXm.message')},
                    ],
                  })(<Input disabled onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.jianhurenXm.placeholder')} />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jianhurenDh')}>
                  {getFieldDecorator('jianhurenDh', {
                    initialValue: editData && editData.jianhurenDh,
                    rules: [
                      {required: true, message: intl.get('Ruyuan.jianhurenDh.message')},
                    ],
                  })(<Input disabled onBlur={() => { onBlur(); }} placeholder={intl.get('Ruyuan.jianhurenDh.placeholder')} />)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={24}>
                <FormItem {...formItemLayout} label="床位">
                  {getFieldDecorator('chuangwei', {
                    initialValue: initChuangwei,
                    rules: [
                    ],
                  })(<Input disabled onFocus={() => { addChuangwei(); }} placeholder="请选择床位" />)}
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
                  })(<Input disabled placeholder={intl.get('Ruyuan.yibaoQk.placeholder')}/>)}
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
                  })(<TextArea disabled rows={3} placeholder={intl.get('Ruyuan.bingshiQk.placeholder')}/>)}
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
                  })(<TextArea disabled rows={3} placeholder={intl.get('Ruyuan.qitaQk.placeholder')}/>)}
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
                  })(<TextArea disabled rows={3} placeholder={intl.get('Ruyuan.teshuZysx.placeholder')}/>)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.zerenyishiXm')}>
                  {getFieldDecorator('zerenyishiXm', {
                    initialValue: editData && editData.zerenyishiXm,
                    rules: [
                    ],
                  })(<Input disabled onBlur={(val) => { onChangeZerenren(val); }} placeholder="请输入责任人" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.zerenyishiDh')}>
                  {getFieldDecorator('zerenyishiDh', {
                    initialValue: editData && editData.zerenyishiDh,
                    rules: [
                    ],
                  })(<Input disabled placeholder={intl.get('Ruyuan.zerenyishiDh.placeholder')} />)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliyuanXm')}>
                  {getFieldDecorator('huliyuanXm', {
                    initialValue: editData && editData.huliyuanXm,
                    rules: [
                    ],
                  })(<Input disabled placeholder={intl.get('Ruyuan.huliyuanXm.placeholder')} />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliyuanDh')}>
                  {getFieldDecorator('huliyuanDh', {
                    initialValue: editData && editData.huliyuanDh,
                    rules: [
                    ],
                  })(<Input disabled placeholder={intl.get('Ruyuan.huliyuanDh.placeholder')} />)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={24}>
                <FormItem {...formItemLayout} label={intl.get('Ruyuan.fuzerenXm')}>
                  {getFieldDecorator('fuzerenXm', {
                    initialValue: editData && editData.fuzerenXm,
                    rules: [
                    ],
                  })(<Input disabled placeholder={intl.get('Ruyuan.fuzerenXm.placeholder')}/>)}
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
                  })(<Input disabled placeholder={intl.get('Ruyuan.fuzerenDh.placeholder')}/>)}
                </FormItem>
              </Col>
            </Row>
            <Row style={{padding: '0 28px'}}>
              <Col span={24}>
                <FormItem {...formItemLayout} label={intl.get('Ruyuan.chuzhiQk')}>
                  {getFieldDecorator('chuzhiQk', {
                    initialValue: editData && editData.chuzhiQk,
                    rules: [
                    ],
                  })(<TextArea disabled rows={3} placeholder={intl.get('Ruyuan.chuzhiQk.placeholder')}/>)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

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
