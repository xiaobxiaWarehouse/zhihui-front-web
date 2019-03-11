import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import moment from 'moment';
import { Button, Modal, Form, Row, Col, Input, Select } from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Option} = Select;

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
    form: {
      getFieldDecorator,
    },
    bumenAll,
    filterValue,
    dispatch,
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
      type: 'ruyuan/updataFilterValue',
      payload: {},
    });
    onFilterChange({
      zerenren: undefined,
      danganZt: undefined,
      yujiSj: undefined,
      keyword: undefined,
      bumen: undefined,
    });
  };

  const datePicker = (
    <DatePicker
      rootNativeProps={{'data-xx': 'yy'}}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 23, 59, 59)}
      defaultDate={filterValue.yujiSj ? moment(filterValue.yujiSj, 'YYYY-MM-DD').toDate() : new Date()}
      mode="date"
    />
  );
  const text = () => {
    return (
      <Form>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="预计入院时间">
              {getFieldDecorator('yujiSj', {
                initialValue: filterValue && filterValue.yujiSj ? moment(filterValue.yujiSj, 'YYYY-MM-DD').toDate() : undefined,
                rules: [],
              })(<PopPicker
                datePicker={datePicker}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                date={filterValue.yujiSj ? moment(filterValue.yujiSj, 'YYYYMMDD') : null}
                okText="确认"
                dismissText="取消"
              >
                <Button>{filterValue.yujiSj ? moment(filterValue.yujiSj).format('YYYY-MM-DD') : '请选择预计入院时间'}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="待办理部门">
              {getFieldDecorator('bumen', {
                initialValue: filter && filter.bumen,
                rules: [],
              })(<Select allowClear placeholder="请选择">{bumenAll && bumenAll.map((k) => {
                return <Option key={k.id} value={String(k.id)}>{k.miaoshu}</Option>;
              })}</Select>)}
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


function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      ruyuan: {
        filterValue,
      },
    } = props;
    let params = {
      ...allValues,
    };
    if (params.yujiSj) {
      params.yujiSj = moment(params.yujiSj).format('YYYYMMDD');
    }
    dispatch({
      type: 'ruyuan/updataFilterValue',
      payload: {
        ...filterValue,
        ...params,
      },
    });
  },
})(modal)));
