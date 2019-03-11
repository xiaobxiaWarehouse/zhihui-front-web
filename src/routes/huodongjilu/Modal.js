import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import { Button, Modal, Form, Row, Col, Input } from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;

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

const modal = (props) => {
  const {
    onFilterChange,
    filter,
    form: {
      getFieldDecorator,
    },
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
      type: 'huodongjilu/updataFilterValue',
      payload: {},
    });
    onFilterChange({
      zerenren: undefined,
      zhuangtai: undefined,
      kaishiSj: undefined,
      keyword: undefined,
      jieshuSj: undefined,
    });
  };

  const {kaishiSj, jieshuSj} = filter;
  let initKaishiSj;
  let initJieshuSj;
  if (kaishiSj) {
    initKaishiSj = moment(kaishiSj, 'YYYYMMDD').toDate();
  }
  if (jieshuSj) {
    initJieshuSj = moment(jieshuSj, 'YYYYMMDD').toDate();
  }

  const datePicker = (
    <DatePicker
      rootNativeProps={{'data-xx': 'yy'}}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      defaultDate={filterValue.kaishiSj ? moment(filterValue.kaishiSj, 'YYYY-MM-DD').toDate() : new Date()}
      mode="date"
    />
  );

  const datePicker2 = (
    <DatePicker
      rootNativeProps={{'data-xx': 'yy'}}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      defaultDate={filterValue.jieshuSj ? moment(filterValue.jieshuSj, 'YYYY-MM-DD').toDate() : new Date()}
      mode="date"
    />
  );

  const text = () => {
    return (
      <Form>
        <Row>
          <Col span={22}>
            <FormItem {...formItemLayout} label="活动时间">
              <Col span={11}>
                <FormItem>
                  {getFieldDecorator('kaishiSj', {
                    initialValue: initKaishiSj,
                    rules: [],
                  })(<PopPicker
                    datePicker={datePicker}
                    transitionName="rmc-picker-popup-slide-fade"
                    maskTransitionName="rmc-picker-popup-fade"
                    title="选择日期"
                    date={filterValue.kaishiSj}
                    okText="确认"
                    dismissText="取消"
                  >
                    <Button style={{width: 148}}>{filterValue.kaishiSj ? moment(filterValue.kaishiSj).format('YYYY-MM-DD') : '请选择开始时间'}</Button>
                  </PopPicker>)}
                </FormItem>
              </Col>
              <Col span={2}>
                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>至</span>
              </Col>
              <Col span={11}>
                <FormItem>
                  {getFieldDecorator('jieshuSj', {
                    initialValue: initJieshuSj,
                    rules: [],
                  })(<PopPicker
                    datePicker={datePicker2}
                    transitionName="rmc-picker-popup-slide-fade"
                    maskTransitionName="rmc-picker-popup-fade"
                    title="选择日期"
                    date={filterValue.jieshuSj}
                    okText="确认"
                    dismissText="取消"
                  >
                    <Button style={{width: 148}}>{filterValue.jieshuSj ? moment(filterValue.jieshuSj).format('YYYY-MM-DD') : '请选择结束时间'}</Button>
                  </PopPicker>)}
                </FormItem>
              </Col>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
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

export default injectIntl(connect(({huodongjilu}) => ({huodongjilu}))(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      huodongjilu: {
        filterValue,
      },
    } = props;
    let params = {
      ...allValues,
    };
    if (params.kaishiSj) {
      params.kaishiSj = moment(params.kaishiSj).format('YYYYMMDD');
    }
    if (params.jieshuSj) {
      params.jieshuSj = moment(params.jieshuSj).format('YYYYMMDD');
    }
    dispatch({
      type: 'huodongjilu/updataFilterValue',
      payload: {
        ...filterValue,
        ...params,
      },
    });
  },
})(modal)));
