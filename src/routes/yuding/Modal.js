import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import moment from 'moment';
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
    onFilterChange,
    filter,
    dispatch,
    filterValue,
    form: {
      getFieldDecorator,
    },
    ...modalProps
  } = props;

  const search = () => {
    onFilterChange({
      ...filterValue,
      forceRefresh: undefined,
    });
  };

  const reset = () => {
    dispatch({
      type: 'yuding/updataFilterValue',
      payload: {},
    });
    onFilterChange({
      ruzhuSj: undefined,
      zhuangtai: undefined,
      jiezhiSj: undefined,
      keyword: undefined,
      zerenren: undefined,
    });
  };

  const datePicker = (
    <DatePicker
      rootNativeProps={{'data-xx': 'yy'}}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      defaultDate={filterValue.ruzhuSj ? moment(filterValue.ruzhuSj, 'YYYY-MM-DD').toDate() : new Date()}
      mode="date"
    />
  );

  const datePicker2 = (
    <DatePicker
      rootNativeProps={{'data-xx': 'yy'}}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      defaultDate={filterValue.jiezhiSj ? moment(filterValue.jiezhiSj, 'YYYY-MM-DD').toDate() : new Date()}
      mode="date"
    />
  );

  const text = () => {
    return (
      <Form>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="入住时间">
              {getFieldDecorator('ruzhuSj', {
                initialValue: filterValue && filterValue.ruzhuSj ? moment(filterValue.ruzhuSj, 'YYYY-MM-DD').toDate() : undefined,
                rules: [],
              })(<PopPicker
                datePicker={datePicker}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                date={filterValue.ruzhuSj ? moment(filterValue.ruzhuSj, 'YYYYMMDD') : null}
                okText="确认"
                dismissText="取消"
              >
                <Button>{filterValue.ruzhuSj ? moment(filterValue.ruzhuSj).format('YYYY-MM-DD') : '请选择入住时间'}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="截止时间">
              {getFieldDecorator('jiezhiSj', {
                initialValue: filterValue && filterValue.jiezhiSj ? moment(filterValue.jiezhiSj, 'YYYY-MM-DD').toDate() : undefined,
                rules: [],
              })(<PopPicker
                datePicker={datePicker2}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                date={filterValue.jiezhiSj ? moment(filterValue.jiezhiSj, 'YYYYMMDD') : null}
                okText="确认"
                dismissText="取消"
              >
                <Button>{filterValue.jiezhiSj ? moment(filterValue.jiezhiSj).format('YYYY-MM-DD') : '请选择截止时间'}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="责任人">
              {getFieldDecorator('zerenren', {
                initialValue: filter && filter.zerenren,
                rules: [],
              })(<Input placeholder="请输入责任人" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Modal className={CSS.searchModal} {...modalProps} footer={null}>
      {text()}
      <div className={CSS.buttonBox}>
        <Button
          className={CSS.resetBtn}
          onClick={() => {
            reset();
          }}
          type="primary"
        >重置</Button>
        <Button
          className={CSS.searchBtn}
          onClick={() => {
            search();
          }}
          type="primary"
        >查询</Button>
      </div>
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
  onFilterChange: PropTypes.func,
};

export default injectIntl(connect(({yuding}) => ({yuding}))(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      yuding: {
        filterValue,
      },
    } = props;
    let params = {
      ...allValues,
    };
    if (params.ruzhuSj) {
      params.ruzhuSj = moment(params.ruzhuSj).format('YYYYMMDD');
    }
    if (params.jiezhiSj) {
      params.jiezhiSj = moment(params.jiezhiSj).format('YYYYMMDD');
    }
    dispatch({
      type: 'yuding/updataFilterValue',
      payload: {
        ...filterValue,
        ...params,
      },
    });
  },
})(modal)));
