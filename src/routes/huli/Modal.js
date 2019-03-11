import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import PopPicker from 'rmc-date-picker/lib/Popup';
import moment from 'moment';
import { Button, Modal, Form, Row, Col, Input, Radio } from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

const radioOption = [
  {id: 1, value: '未护理'},
  {id: 2, value: '已护理'},
  {id: -1, value: '全部'},
];

const modal = (props) => {
  const {
    dispatch,
    onFilterChange,
    filter,
    form: {
      getFieldDecorator,
    },
    filterValue,
    ...modalProps
  } = props;

  const onSubmit = () => {
    onFilterChange({
      ...filterValue,
      forceRefresh: undefined,
    });
  };

  const reset = () => {
    dispatch({
      type: 'huli/updataFilterValue',
      payload: {},
    });
    onFilterChange({
      zerenyishi: undefined,
      huliyuan: undefined,
      huliZt: undefined,
      riqi: moment(new Date(), 'YYYYMMDD').format('YYYYMMDD'),
      louceng: undefined,
      louhao: undefined,
      keyword: undefined,
      fanghao: undefined,
    });
  };

  // const {riqi} = filter;

  const datePicker = (
    <DatePicker
      rootNativeProps={{'data-xx': 'yy'}}
      minDate={new Date(1700, 1, 1, 0, 0, 0)}
      maxDate={new Date(2060, 12, 31, 0, 0, 0)}
      defaultDate={filterValue.riqi ? moment(filterValue.riqi, 'YYYYMMDD').toDate() : new Date()}
      mode="date"
    />
  );

  const text = () => {
    return (
      <Form>
        <Row>
          <Col span={18} push={6}>
            <FormItem>
              {getFieldDecorator('huliZt', {
                initialValue: filter && filter.huliZt ? Number(filter.huliZt) : -1,
                rules: [],
              })(<RadioGroup>
                {
                  radioOption.map((item) => {
                    return (
                      <Radio key={item.id} value={item.id}>{item.value}</Radio>
                    );
                  })
                }
              </RadioGroup>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="护理日期">
              {getFieldDecorator('riqi', {
                initialValue: filterValue && filterValue.riqi ? moment(filterValue.riqi, 'YYYYMMDD').toDate() : moment(new Date(), 'YYYYMMDD').toDate(),
                rules: [],
              })(<PopPicker
                datePicker={datePicker}
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                title="选择日期"
                date={filterValue.riqi ? moment(filterValue.riqi, 'YYYYMMDD') : moment(new Date(), 'YYYYMMDD')}
                okText="确认"
                dismissText="取消"
              >
                <Button>{filterValue.riqi ? moment(filterValue.riqi).format('YYYY-MM-DD') : moment(new Date(), 'YYYYMMDD').format('YYYY-MM-DD')}</Button>
              </PopPicker>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="护理员">
              {getFieldDecorator('huliyuan', {
                initialValue: filter && filter.huliyuan,
                rules: [],
              })(<Input placeholder="请输入护理员" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <FormItem {...formItemLayout} label="责任医师">
              {getFieldDecorator('zerenyishi', {
                initialValue: filter && filter.zerenyishi,
                rules: [],
              })(<Input placeholder="请输入责任医师" />)}
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
            onSubmit();
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

export default injectIntl(connect(({huli}) => ({huli}))(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      huli: {
        filterValue,
      },
    } = props;
    let params = {
      ...allValues,
    };
    if (params.riqi) {
      params.riqi = moment(params.riqi).format('YYYYMMDD');
    }
    dispatch({
      type: 'huli/updataFilterValue',
      payload: {
        ...filterValue,
        ...params,
      },
    });
  },
})(modal)));
