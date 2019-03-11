import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import PopPicker from 'rmc-date-picker/lib/Popup';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import { Button, Modal, Form, Row, Col, Input } from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
  style: {
  },
};

const modal = (props) => {
  const {
    onOk,
    filter,
    dispatch,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    },
    ...modalProps
  } = props;
  const fields = getFieldsValue();
  const add = () => {
    if (fields['01']) {
      fields['01'] = moment(fields['01']).format('YYYY-MM-DD');
    }
    if (fields['02']) {
      fields['02'] = moment(fields['02']).format('YYYY-MM-DD');
    }
    setFieldsValue({
      '01': undefined,
      '02': undefined,
      '03': undefined,
      '04': undefined,
    });
    onOk(fields);
  };

  const datePicker = (
    <DatePicker
      rootNativeProps={{ 'data-xx': 'yy' }}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      defaultDate={new Date()}
      mode="date"
    />
  );
  const datePicker2 = (
    <DatePicker
      rootNativeProps={{ 'data-xx': 'yy' }}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      defaultDate={new Date()}
      mode="date"
    />
  );

  const text = () => {
    return (
      <Form>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="开始时间">
              {getFieldDecorator('01', {
                rules: [
                ],
              })(<PopPicker
                datePicker={datePicker}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                // date={fields['01'].toDate()}
                okText="确认"
                dismissText="取消"
              >
                <Button>{fields['01'] ? moment(fields['01']).format('YYYY-MM-DD') : '请选择开始时间'}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="结束时间">
              {getFieldDecorator('02', {
                rules: [
                ],
              })(<PopPicker
                datePicker={datePicker2}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                okText="确认"
                // date={fields['02'].toDate()}
                dismissText="取消"
              >
                <Button>{fields['02'] ? moment(fields['02']).format('YYYY-MM-DD') : '请选择结束时间'}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="所在学校/单位">
              {getFieldDecorator('03', {
                rules: [
                ],
              })(<Input placeholder="请输入所在学校/单位" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="专业/工作岗位">
              {getFieldDecorator('04', {
                rules: [
                ],
              })(<Input placeholder="请输入专业/工作岗位" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Modal className={CSS.addModal} {...modalProps} footer={null}>
      {text()}
      <div style={{marginTop: 10}} className={CSS.buttonBox}>
        <Button
          className={CSS.searchBtn}
          onClick={() => {
            add();
          }}
          type="primary"
        >确认</Button>
      </div>
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
  onFilterChange: PropTypes.func,
};


function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(modal)));
