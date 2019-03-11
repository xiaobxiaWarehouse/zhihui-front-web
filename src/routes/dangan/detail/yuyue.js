import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import {Button, Col, Form, Input, Row, Select, DatePicker} from 'antd';
import {JXRS} from 'components';
import styles from './index.less';
import Page from './page';

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

const chuzhiDzRadio = [{
  id: 1,
  value: '待反馈',
}, {
  id: 2,
  value: '待处理',
}, {
  id: 3,
  value: '已完成',
}, {
  id: 4,
  value: '已作废',
}];

const Yuyue = (props) => {
  const {
    form: {
      getFieldDecorator,
    },
    yuyue,
    yuyueData,
    onEdit,
    onPage,
    app: {
      allXingbie,
    },
    onyuyuePdf,
    currentYuyueIndex,
  } = props;
  const pageProps = {
    length: yuyue.length,
    index: currentYuyueIndex,
    onLeft() {
      let newCurrentYuyueIndex = currentYuyueIndex - 1;
      onPage(newCurrentYuyueIndex);
    },
    onRight() {
      let newCurrentYuyueIndex = currentYuyueIndex + 1;
      onPage(newCurrentYuyueIndex);
    },
    time: moment(yuyue[currentYuyueIndex].createTime, 'YYYY-MM-DD'),
    isDisabled: false,
  };

  return (
    <div className={styles.disabledColor}>
      <Form className="add-form">
        <Row className={styles.pgTitle} id="2">
          <Col span={9} className={styles.titleName}>业务表单 | 预约单</Col>
          <Col span={5} push={4}>
            <Button
              htmlType="button"
              className={styles.btn}
              onClick={() => {
                onyuyuePdf();
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
          yuyue.length > 1 && <Page {...pageProps} />
        }
        <div>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Yuyue.yuyueRq')}>
                {getFieldDecorator('yuyueRq', {
                  initialValue: yuyueData && yuyueData.createTime ? moment(yuyueData.createTime, 'YYYY-MM-DD') : undefined,
                  rules: [
                  ],
                })(<DatePicker placeholder="" disabled getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD"/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Yuyue.canguanSj')}>
                {getFieldDecorator('canguanSj', {
                  initialValue: yuyueData && yuyueData.canguanSj ? moment(yuyueData.canguanSj, 'YYYY-MM-DD') : undefined,
                  rules: [
                  ],
                })(<DatePicker placeholder="" disabled getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Yuyue.xingming')}>
                {getFieldDecorator('xingming', {
                  initialValue: yuyueData && yuyueData.xingming,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Yuyue.xingbie')}>
                {getFieldDecorator('xingbie', {
                  initialValue: yuyueData && yuyueData.xingbie ? String(yuyueData.xingbie) : undefined,
                  rules: [
                  ],
                })(<Select disabled getPopupContainer={triggerNode => triggerNode.parentNode}>{allXingbie.map((k) => {
                  return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Yuyue.nianling')}>
                {getFieldDecorator('nianling', {
                  initialValue: (yuyueData && yuyueData.nianling) || '',
                  rules: [
                    {pattern: /^[0-9]+$/, message: '请输入正确的年龄'},
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Yuyue.jibenQk')}>
                {getFieldDecorator('jibenQk', {
                  initialValue: yuyueData && yuyueData.jibenQk,
                  rules: [
                  ],
                })(<TextArea disabled rows={3}/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Yuyue.lianxirenXm')}>
                {getFieldDecorator('lianxirenXm', {
                  initialValue: yuyueData && yuyueData.lianxirenXm,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Yuyue.lianxirenDh')}>
                {getFieldDecorator('lianxirenDh', {
                  initialValue: yuyueData && yuyueData.lianxirenDh,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Yuyue.laiyuan')}>
                {getFieldDecorator('laiyuan', {
                  initialValue: yuyueData && yuyueData.laiyuan,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Yuyue.zerenrenXm')}>
                {getFieldDecorator('zerenrenXm', {
                  initialValue: yuyueData && yuyueData.zerenrenXm,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Yuyue.zerenrenDh')}>
                {getFieldDecorator('zerenrenDh', {
                  initialValue: yuyueData && yuyueData.zerenrenDh,
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Yuyue.beizhu')}>
                {getFieldDecorator('beizhu', {
                  initialValue: yuyueData && yuyueData.beizhu,
                  rules: [
                  ],
                })(<TextArea disabled rows={3}/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Yuyue.zhuangtai')}>
                {getFieldDecorator('zhuangtai', {
                  initialValue: yuyueData && yuyueData.zhuangtai ? String(yuyueData.zhuangtai) : undefined,
                  rules: [
                  ],
                })(<Select disabled getPopupContainer={triggerNode => triggerNode.parentNode}>{chuzhiDzRadio.map((k) => {
                  return <Option key={k.id} value={String(k.id)}>{k.value}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Yuyue.chuzhiQk')}>
                {getFieldDecorator('chuzhiQk', {
                  initialValue: yuyueData && yuyueData.chuzhiQk,
                  rules: [
                  ],
                })(<TextArea disabled rows={3}/>)}
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

export default injectIntl(connect(mapStateToProps)(Form.create()(Yuyue)));
