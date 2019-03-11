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
    dispatch,
    onFilterChange,
    filter,
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
      type: 'yuyue/updataFilterValue',
      payload: {},
    });
    onFilterChange({
      zerenren: undefined,
      zhuangtai: undefined,
      canguanSj: undefined,
      keyword: undefined,
    });
  };

  const datePicker = (
    <DatePicker
      rootNativeProps={{'data-xx': 'yy'}}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      defaultDate={filterValue.canguanSj ? moment(filterValue.canguanSj, 'YYYY-MM-DD').toDate() : new Date()}
      mode="date"
    />
  );
  const text = () => {
    return (
      <Form>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="预约参观日期">
              {getFieldDecorator('canguanSj', {
                initialValue: filterValue && filterValue.canguanSj ? moment(filterValue.canguanSj, 'YYYY-MM-DD').toDate() : undefined,
                rules: [],
              })(<PopPicker
                datePicker={datePicker}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                date={filterValue.canguanSj ? moment(filterValue.canguanSj, 'YYYYMMDD') : null}
                okText="确认"
                dismissText="取消"
              >
                <Button>{filterValue.canguanSj ? moment(filterValue.canguanSj).format('YYYY-MM-DD') : '请选择预约参观日期'}</Button>
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

export default injectIntl(connect(({yuyue}) => ({yuyue}))(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      yuyue: {
        filterValue,
      },
    } = props;
    let params = {
      ...allValues,
    };
    if (params.canguanSj) {
      params.canguanSj = moment(params.canguanSj).format('YYYYMMDD');
    }
    dispatch({
      type: 'yuyue/updataFilterValue',
      payload: {
        ...filterValue,
        ...params,
      },
    });
  },
})(modal)));
