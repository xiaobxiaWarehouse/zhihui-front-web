import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import moment from 'moment';
import {Button, Col, Form, Input, Row, Select, DatePicker} from 'antd';
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

const Ruyuan = (props) => {
  const {
    form: {
      getFieldDecorator,
    },
    shenqing,
    shenqingData,
    onEdit,
    onPage,
    app: {
      allHulidengji,
      allXingbie,
    },
    onshengqingPdf,
    currentRuyuanIndex,
  } = props;
  const pageProps = {
    length: shenqing.length,
    index: currentRuyuanIndex,
    onLeft() {
      let newCurrentRuyuanIndex = currentRuyuanIndex - 1;
      onPage(newCurrentRuyuanIndex);
    },
    onRight() {
      let newCurrentRuyuanIndex = currentRuyuanIndex + 1;
      onPage(newCurrentRuyuanIndex);
    },
    time: moment(shenqing[currentRuyuanIndex].createTime, 'YYYY-MM-DD'),
    isDisabled: false,
  };
  return (
    <div className={styles.disabledColor}>
      <Form className="add-form">
        <Row className={styles.pgTitle} id="4">
          <Col span={9} className={styles.titleName}>业务表单 | 入院申请单</Col>
          <Col span={5} push={4}>
            <Button
              htmlType="button"
              className={styles.btn}
              onClick={() => {
                onshengqingPdf();
              }}
            > 导出PDF</Button>
          </Col>
          <Col span={5} push={5}>
            <Button
              className={styles.btn}
              onClick={() => {
                onEdit(currentRuyuanIndex);
              }}
            ><JXRSIcon type="edit"/> 编辑表单</Button>
          </Col>
        </Row>
        {
          shenqing.length > 1 && <Page {...pageProps} />
        }
        <div>
          <Row type="flex" style={{paddingTop: 13}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.huliDj')}>
                {getFieldDecorator('huliDj', {
                  initialValue: shenqingData && shenqingData.huliDj ? String(shenqingData.huliDj) : undefined,
                  rules: [
                  ],
                })(<Select disabled getPopupContainer={triggerNode => triggerNode.parentNode}>{allHulidengji.length > 0 && allHulidengji.map((k) => {
                  return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.chuangwei')}>
                {getFieldDecorator('chuangwei', {
                  initialValue: shenqingData && shenqingData.chuangwei.length > 0 ? `${shenqingData.chuangwei[0].louhao}楼${shenqingData.chuangwei[0].louceng}层${shenqingData.chuangwei[0].fanghao}房${shenqingData.chuangwei[0].chuanghao}床` : '',
                  rules: [
                  ],
                })(<Input disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.yudingRq')}>
                {getFieldDecorator('yudingRq', {
                  initialValue: shenqingData && shenqingData.yudingRq ? moment(shenqingData.yudingRq, 'YYYY-MM-DD') : undefined,
                  rules: [
                  ],
                })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD" />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.yujiSj')}>
                {getFieldDecorator('yujiSj', {
                  initialValue: shenqingData && shenqingData.yujiSj ? moment(shenqingData.yujiSj, 'YYYY-MM-DD HH:mm') : undefined,
                  rules: [
                  ],
                })(<DatePicker placeholder="" disabled showTime className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD HH:mm" />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.shijiSj')}>
                {getFieldDecorator('shijiSj', {
                  initialValue: shenqingData && shenqingData.shijiSj ? moment(shenqingData.shijiSj, 'YYYY-MM-DD HH:mm') : undefined,
                  rules: [
                  ],
                })(<DatePicker placeholder="" disabled showTime className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD HH:mm" />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.xingming')}>
                {getFieldDecorator('xingming', {
                  initialValue: shenqingData && shenqingData.xingming,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.xingbie')}>
                {getFieldDecorator('xingbie', {
                  initialValue: shenqingData && shenqingData.xingbie ? String(shenqingData.xingbie) : undefined,
                  rules: [
                  ],
                })(<Select disabled getPopupContainer={triggerNode => triggerNode.parentNode}>{allXingbie.length > 0 && allXingbie.map((k) => {
                  return <Option key={k.zhi} value={String(k.zhi)}>{k.zhongwen}</Option>;
                })}</Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jiguan')}>
                {getFieldDecorator('jiguan', {
                  initialValue: shenqingData && shenqingData.jiguan,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.shenfenzheng')}>
                {getFieldDecorator('shenfenzheng', {
                  initialValue: shenqingData && shenqingData.shenfenzheng,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.nianling')}>
                {getFieldDecorator('nianling', {
                  initialValue: (shenqingData && shenqingData.nianling) || '',
                  rules: [
                    {pattern: /^[0-9]+$/, message: '请输入正确的年龄'},
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jianhurenXm')}>
                {getFieldDecorator('jianhurenXm', {
                  initialValue: shenqingData && shenqingData.jianhurenXm,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.jianhurenDh')}>
                {getFieldDecorator('jianhurenDh', {
                  initialValue: shenqingData && shenqingData.jianhurenDh,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.yibaoQk')}>
                {getFieldDecorator('yibaoQk', {
                  initialValue: shenqingData && shenqingData.yibaoQk,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.bingshiQk')}>
                {getFieldDecorator('bingshiQk', {
                  initialValue: shenqingData && shenqingData.bingshiQk,
                  rules: [
                  ],
                })(<TextArea disabled rows={3} />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.qitaQk')}>
                {getFieldDecorator('qitaQk', {
                  initialValue: shenqingData && shenqingData.qitaQk,
                  rules: [
                  ],
                })(<TextArea disabled rows={3} />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.teshuZysx')}>
                {getFieldDecorator('teshuZysx', {
                  initialValue: shenqingData && shenqingData.teshuZysx,
                  rules: [
                  ],
                })(<TextArea disabled rows={3} />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.zerenyishiXm')}>
                {getFieldDecorator('zerenyishiXm', {
                  initialValue: shenqingData && shenqingData.zerenyishiXm,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.zerenyishiDh')}>
                {getFieldDecorator('zerenyishiDh', {
                  initialValue: shenqingData && shenqingData.zerenyishiDh,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliyuanXm')}>
                {getFieldDecorator('huliyuanXm', {
                  initialValue: shenqingData && shenqingData.huliyuanXm,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout2} label={intl.get('Ruyuan.huliyuanDh')}>
                {getFieldDecorator('huliyuanDh', {
                  initialValue: shenqingData && shenqingData.huliyuanDh,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.fuzerenXm')}>
                {getFieldDecorator('fuzerenXm', {
                  initialValue: shenqingData && shenqingData.fuzerenXm,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} className="lineFeedForm" label={intl.get('Ruyuan.fuzerenDh')}>
                {getFieldDecorator('fuzerenDh', {
                  initialValue: shenqingData && shenqingData.fuzerenDh,
                  rules: [
                  ],
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex">
            <Col span={24}>
              <FormItem {...formItemLayout} label={intl.get('Ruyuan.chuzhiQk')}>
                {getFieldDecorator('chuzhiQk', {
                  initialValue: shenqingData && shenqingData.chuzhiQk,
                  rules: [
                  ],
                })(<TextArea disabled rows={3} />)}
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

export default injectIntl(connect(mapStateToProps)(Form.create()(Ruyuan)));
