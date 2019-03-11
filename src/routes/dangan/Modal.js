import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Button, Modal, Form, Row, Col, Input, DatePicker, Radio } from 'antd';
import {Layout} from 'components';
import styles from './index.less';

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
  {id: 2, value: '已入住'},
  {id: 3, value: '已离院'},
  {id: -1, value: '全部'},
];

const modal = (props) => {
  const {
    dispatch,
    onFilterChange,
    filter,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    },
    filterValue,
    ...modalProps
  } = props;

  const search = () => {
    onFilterChange({
      ...filterValue,
      forceRefresh: undefined,
    });
  };

  // const reset = () => {
  //   let fields = getFieldsValue();
  //   onFilterChange({zerenyishi: '', huliyuan: '', zhuangtai: ''});
  // };

  const reset = () => {
    dispatch({
      type: 'dangan/updataFilterValue',
      payload: {},
    });
    onFilterChange({
      zerenyishi: undefined,
      huliyuan: undefined,
      zhuangtai: undefined,
      riqi: undefined,
      louceng: undefined,
      louhao: undefined,
      keyword: undefined,
      fanghao: undefined,
    });
  };
  const {riqi} = filter;
  let initRiqi;
  if (riqi) {
    initRiqi = moment(riqi, 'YYYYMMDD');
  }

  const text = () => {
    return (
      <Form>
        <Row>
          <Col span={15} push={7}>
            <FormItem>
              {getFieldDecorator('zhuangtai', {
                initialValue: filter && filter.zhuangtai ? Number(filter.zhuangtai) : -1,
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
            <FormItem {...formItemLayout} label="护理员">
              {getFieldDecorator('huliyuan', {
                initialValue: filter && filter.huliyuan,
                rules: [],
              })(<Input placeholder="请选择护理员" />)}
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

export default injectIntl(connect(({dangan}) => ({dangan}))(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      dangan: {
        filterValue,
      },
    } = props;
    dispatch({
      type: 'dangan/updataFilterValue',
      payload: {
        ...filterValue,
        ...allValues,
      },
    });
  },
})(modal)));
