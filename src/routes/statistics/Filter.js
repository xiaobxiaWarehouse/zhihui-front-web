import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row } from 'antd';
import moment from 'moment';
import PopPicker from 'rmc-date-picker/lib/Popup';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import styles from './index.less';

const FormItem = Form.Item;

const Index = (props) => {
  const {
    statistics,
    onFilterChange,
    form: {
      getFieldDecorator,
      getFieldsValue,
    },
    dispatch,
  } = props;

  const onChangeShijian = () => {
    let params = getFieldsValue();
    params.kaishiDate = moment(params.kaishiDate).format('x');
    params.jieshuDate = moment(params.jieshuDate).format('x');
    onFilterChange(params);
  };

  const datePicker = (
    <DatePicker
      rootNativeProps={{ 'data-xx': 'yy' }}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      mode="date"
      defaultDate={statistics.kaishiDate ? moment(statistics.kaishiDate, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
    />
  );
  const datePicker2 = (
    <DatePicker
      rootNativeProps={{ 'data-xx': 'yy' }}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      mode="date"
      defaultDate={statistics.jieshuDate ? moment(statistics.jieshuDate, 'YYYY-MM-DD HH:mm').toDate() : new Date()}
    />
  );
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
    style: {
    },
  };
  return (
    <div>
      <Form>
        <Row type="flex" justify="space-between">
          <Col span={11} className={styles.searchCol}>
            <FormItem {...formItemLayout} className="abnormal-width-formitem" label="时间">
              {getFieldDecorator('kaishiDate', {
                initialValue: statistics.kaishiDate ? statistics.kaishiDate.toDate() : undefined,
                rules: [],
              })(<PopPicker
                datePicker={datePicker}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                okText="确认"
                date={statistics.kaishiDate.toDate()}
                dismissText="取消"
                onChange={(date) => {
                  dispatch({
                    type: 'statistics/updateKaishiDate',
                    payload: moment(date),
                  });
                }}
              >
                <Button style={{ width: '100%' }}>{statistics.kaishiDate ? moment(statistics.kaishiDate).format('YYYY-MM-DD') : '请选择开始时间'}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
          <Col span={2} className={styles.spanName}>
            至
          </Col>
          <Col span={8}>
            <FormItem className="abnormal-width-formitem">
              {getFieldDecorator('jieshuDate', {
                initialValue: statistics.jieshuDate ? statistics.jieshuDate.toDate() : undefined,
                rules: [],
              })(<PopPicker
                datePicker={datePicker2}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                okText="确认"
                date={statistics.jieshuDate.toDate()}
                dismissText="取消"
                onChange={(date) => {
                  dispatch({
                    type: 'statistics/updateJieshuDate',
                    payload: moment(date),
                  });
                }}
              >
                <Button style={{ width: '100%' }}>{statistics.jieshuDate ? moment(statistics.jieshuDate).format('YYYY-MM-DD') : '请选择结束时间'}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
          <Col span={3}>
            <Button
              type="primary"
              onClick={onChangeShijian}
              className={styles.searchButton}
            >
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};


function mapStateToProps(state) {
  return {
    app: state.app,
    statistics: state.statistics,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
