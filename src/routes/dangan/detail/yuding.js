import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import {Button, Col, Form, Input, Row, Select, DatePicker, TimePicker} from 'antd';
import {JXRS, Layout} from 'components';
import styles from './index.less';
import Page from './page';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const JXRSIcon = JXRS.Icon;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
  style: {
  },
};

const formItemLayout2 = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
  style: {
  },
};

const formItemLayout3 = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
  style: {
  },
};


const Yuding = (props) => {
  const {
    form: {
      getFieldDecorator,
    },
    yuding,
    yudingData,
    onEdit,
    currentYudingIndex,
    onPage,
    app: {
      allHulidengji,
      allXingbie,
    },
    onyudingPdf,
  } = props;

  const pageProps = {
    length: yuding.length,
    index: currentYudingIndex,
    onLeft() {
      let newCurrentYudingIndex = currentYudingIndex - 1;
      onPage(newCurrentYudingIndex);
    },
    onRight() {
      let newCurrentYudingIndex = currentYudingIndex + 1;
      onPage(newCurrentYudingIndex);
    },
    time: moment(yuding[currentYudingIndex].createTime, 'YYYY-MM-DD'),
    isDisabled: false,
  };

  let jiezhiSj = yudingData && yudingData.jiezhiSj;
  let ruzhuSj = yudingData && yudingData.ruzhuSj;

  let initJiezhiSjA;
  let initJiezhiSjB;
  let initRuzhuSjA;
  let initRuzhuSjB;
  if (jiezhiSj) {
    initJiezhiSjA = moment(jiezhiSj, 'YYYY-MM-DD');
    initJiezhiSjB = moment(jiezhiSj, 'YYYY-MM-DD HH:mm');
  }
  if (ruzhuSj) {
    initRuzhuSjA = moment(ruzhuSj, 'YYYY-MM-DD');
    initRuzhuSjB = moment(ruzhuSj, 'YYYY-MM-DD HH:mm');
  }


  return (
    <div className={styles.disabledColor}>
      <Form className="add-form">
        <Row className={styles.pgTitle}>
          <Col id="3" span={9} className={styles.titleName}>业务表单 | 预定单</Col>
          <Col span={5} push={4}>
            <Button
              htmlType="button"
              className={styles.btn}
              onClick={() => {
                onyudingPdf();
              }}
            > 导出PDF</Button>
          </Col>
          <Col span={5} push={5}>
            <Button
              htmlType="button"
              className={styles.btn}
              onClick={() => {
                onEdit();
              }}
            ><JXRSIcon type="edit"/> 编辑表单</Button>
          </Col>
        </Row>
        {
          yuding.length > 1 && <Page {...pageProps} />
        }
        <div>
          <Row style={{padding: '0 28px'}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="预约单编号">
                {getFieldDecorator('bianhao', {
                  initialValue: yudingData && yudingData.bianhao,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}}>
            <Col span={12}>
              <FormItem {...formItemLayout2} label="护理等级">
                {getFieldDecorator('huliDj', {
                  initialValue: yudingData && yudingData.huliDj ? String(yudingData.huliDj) : undefined,
                  rules: [
                  ],
                })(<Select disabled>{allHulidengji.map((k) => {
                  return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout3} label="预定日期">
                {getFieldDecorator('yudingRq', {
                  initialValue: yudingData && yudingData.createTime ? moment(yudingData.createTime, 'YYYY-MM-DD') : undefined,
                  rules: [
                  ],
                })(<DatePicker placeholder="" disabled format="YYYY-MM-DD"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}} gutter={20}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="入住时间">
                <Col span={15}>
                  <FormItem>
                    {getFieldDecorator('ruzhuSjA', {
                      initialValue: initRuzhuSjA,
                    })(<DatePicker placeholder="" disabled format="YYYY-MM-DD"/>)}
                  </FormItem>
                </Col>
                <Col span={9}>
                  <FormItem>
                    {getFieldDecorator('ruzhuSjB', {
                      initialValue: initRuzhuSjB,
                      rules: [
                      ],
                    })(<TimePicker placeholder="" disabled className={CSS.timePicker} getPopupContainer={triggerNode => triggerNode.parentNode} format="HH:mm:ss" />)}
                  </FormItem>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}} gutter={20}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="截止时间">
                <Col span={15}>
                  <FormItem>
                    {getFieldDecorator('jiezhiSjA', {
                      initialValue: initJiezhiSjA,
                      rules: [
                      ],
                    })(<DatePicker placeholder="" disabled format="YYYY-MM-DD"/>)}
                  </FormItem>
                </Col>
                <Col span={9}>
                  <FormItem>
                    {getFieldDecorator('jiezhiSjB', {
                      initialValue: initJiezhiSjB,
                      rules: [
                      ],
                    })(<TimePicker placeholder="" disabled className={CSS.timePicker} getPopupContainer={triggerNode => triggerNode.parentNode} format="HH:mm:ss" />)}
                  </FormItem>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="预定床位">
                {getFieldDecorator('chuangwei', {
                  initialValue: yudingData && yudingData.chuangwei.length > 0 ? `${yudingData.chuangwei[0].louhao}楼${yudingData.chuangwei[0].louceng}层${yudingData.chuangwei[0].fanghao}房${yudingData.chuangwei[0].chuanghao}床` : undefined,
                  rules: [
                  ],
                })(<Input disabled onFocus={() => { addChuangwei(); }}/>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="休养员姓名">
                {getFieldDecorator('xingming', {
                  initialValue: yudingData && yudingData.xingming,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}}>
            <Col span={12}>
              <FormItem {...formItemLayout2} label="休养员性别">
                {getFieldDecorator('xingbie', {
                  initialValue: yudingData && yudingData.xingbie ? String(yudingData.xingbie) : undefined,
                  rules: [
                  ],
                })(<Select disabled>{allXingbie.map((k) => {
                  return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout3} label="休养员年龄">
                {getFieldDecorator('nianling', {
                  initialValue: (yudingData && yudingData.nianling) || '',
                  rules: [
                    {pattern: /^[0-9]+$/, message: '请输入正确的年龄'},
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="休养员情况">
                {getFieldDecorator('jibenQk', {
                  initialValue: yudingData && yudingData.jibenQk,
                  rules: [
                  ],
                })(<TextArea disabled rows={4}/>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}}>
            <Col span={12}>
              <FormItem {...formItemLayout2} label="联系人姓名">
                {getFieldDecorator('lianxirenXm', {
                  initialValue: yudingData && yudingData.lianxirenXm,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout3} label="联系人电话">
                {getFieldDecorator('lianxirenDh', {
                  initialValue: yudingData && yudingData.lianxirenDh,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}}>
            <Col span={12}>
              <FormItem {...formItemLayout2} label="责任人">
                {getFieldDecorator('zerenrenXm', {
                  initialValue: yudingData && yudingData.zerenrenXm,
                  rules: [
                  ],
                })(<Input disabled onBlur={(val) => { onChangeZerenren(val); }}/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout3} label="责任人电话">
                {getFieldDecorator('zerenrenDh', {
                  initialValue: yudingData && yudingData.zerenrenDh,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row style={{padding: '0 28px'}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="备注">
                {getFieldDecorator('beizhu', {
                  initialValue: yudingData && yudingData.beizhu,
                  rules: [
                  ],
                })(<TextArea disabled rows={4}/>)}
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    dangan: state.dangan,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(Yuding)));
