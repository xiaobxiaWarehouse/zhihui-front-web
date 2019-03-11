import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Layout} from 'components';
import moment from 'moment';
import {Col, Form, Input, Row, Select, DatePicker} from 'antd';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;

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

const Ruzhu = (props) => {
  const {
    form: {
      getFieldDecorator,
    },
    ruzhuData,
    jiankangXml,
  } = props;

  return (
    <div id="1" className={styles.disabledColor}>
      <Row className={styles.pgTitle}>
        <Col span={4} className={styles.titleName}>入住信息</Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem {...formItemLayout2} label="休养员姓名">
            {getFieldDecorator('xingming', {
              initialValue: ruzhuData && ruzhuData.xingming,
              rules: [
              ],
            })(<Input disabled />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout2} label="性别">
            {getFieldDecorator('xingbie', {
              initialValue: (ruzhuData && ruzhuData.xingbie) || undefined,
              rules: [
              ],
            })(<Select disabled allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{jiankangXml && jiankangXml['pre01.05'].children.map((k) => {
              return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
            })}</Select>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="身份证">
            {getFieldDecorator('shenfenzheng', {
              initialValue: ruzhuData && ruzhuData.shenfenzheng,
              rules: [
              ],
            })(<Input disabled/>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="入院日期">
            {getFieldDecorator('shijiSj', {
              initialValue: ruzhuData && ruzhuData.shijiSj ? moment(ruzhuData.shijiSj, 'YYYY-MM-DD') : undefined,
              rules: [
              ],
            })(<DatePicker placeholder="" disabled className={CSS.datePicker} getCalendarContainer={triggerNode => triggerNode.parentNode} format="YYYY-MM-DD"/>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="护理等级">
            {getFieldDecorator('huliDj', {
              initialValue: ruzhuData && ruzhuData.huliDj ? String(ruzhuData.huliDj) : undefined,
              rules: [
              ],
            })(<Select disabled allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>{jiankangXml && jiankangXml['pre01.08'].children.map((k) => {
              return <Option key={k.value} value={String(k.value)}>{k.content}</Option>;
            })}</Select>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="床位">
            {getFieldDecorator('chuangwei', {
              initialValue: ruzhuData && ruzhuData.chuangwei.length > 0 ? ruzhuData.baofang === 2 ? `${ruzhuData.chuangwei[0].louhao}楼${ruzhuData.chuangwei[0].louceng}层${ruzhuData.chuangwei[0].fanghao}房` : `${ruzhuData.chuangwei[0].louhao}楼${ruzhuData.chuangwei[0].louceng}层${ruzhuData.chuangwei[0].fanghao}房${ruzhuData.chuangwei[0].chuanghao}床` : undefined,
              rules: [
              ],
            })(<Input disabled/>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="医保情况">
            {getFieldDecorator('yibaoQk', {
              initialValue: ruzhuData && ruzhuData.yibaoQk,
              rules: [
              ],
            })(<Input disabled/>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="监护人姓名">
            {getFieldDecorator('jianhurenXm', {
              initialValue: ruzhuData && ruzhuData.jianhurenXm,
              rules: [
              ],
            })(<Input disabled/>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem {...formItemLayout} label="监护人电话">
            {getFieldDecorator('jianhurenDh', {
              initialValue: ruzhuData && ruzhuData.jianhurenDh,
              rules: [
              ],
            })(<Input disabled/>)}
          </FormItem>
        </Col>
      </Row>
    </div>
  );
};


Ruzhu.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

export default injectIntl(connect(({dangan}) => ({dangan}))(Form.create()(Ruzhu)));
