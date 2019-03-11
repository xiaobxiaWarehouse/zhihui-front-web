import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Button, Col, Form, Input, Row, Select, Icon, suffixIcon} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

const Filter = (props) => {
  const {
    dispatch,
    onFilterChange,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    },
    filter,
    louhaoList,
    loucengList,
    filterValue,
  } = props;

  const handleOk = () => {
    let fields = getFieldsValue();
    if (fields.louhao !== filter.louhao || fields.louceng !== filter.louceng || fields.fanghao !== filter.fanghao || fields.fanghao !== filter.fanghao || fields.keyword !== filter.keyword) {
      onFilterChange(filterValue);
    }
  };

  const onChangeLouhao = (val) => {
    setFieldsValue({
      louceng: undefined,
    });
    if (val) {
      dispatch({
        type: 'huli/alllouceng',
        payload: {
          louhao: val,
        },
      });
    } else {
      dispatch({
        type: 'huli/updateLoucengList',
        payload: [],
      });
    }
  };

  return (
    <Form layout="inline">
      <Row className={styles.huliFilter}>
        <Col span={8}>
          <FormItem label="楼号" >
            {getFieldDecorator('louhao', {
              initialValue: filter && filter.louhao,
              rules: [],
            })(<Select
              onChange={(val) => {
                onChangeLouhao(val);
              }}
              allowClear
              placeholder="请选择楼号"
            >
              {louhaoList.map((item) => {
                return (
                  <Option key={item.louhao} value={String(item.louhao)}>
                    {item.louhao}
                  </Option>
                );
              })}
            </Select>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="楼层">
            {getFieldDecorator('louceng', {
              initialValue: filter && filter.louceng,
              rules: [],
            })(<Select
              disabled={!loucengList.length > 0}
              allowClear
              placeholder="请选择楼层"
            >
              {loucengList.map((item) => {
                return (
                  <Option key={item.louceng} value={String(item.louceng)}>
                    {item.louceng}
                  </Option>
                );
              })}
            </Select>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="房号">
            {getFieldDecorator('fanghao', {
              initialValue: filter && filter.fanghao,
              rules: [],
            })(<Input placeholder="请输入房号" />)}
          </FormItem>
        </Col>
      </Row>
      <Row className={styles.searchFilter}>
        <Col span={24}>
          <div style={{float: 'right', padding: '2px 0'}}>
            <Button
              className="btn"
              type="primary"
              style={{marginRight: 0}}
              onClick={() => {
                dispatch({
                  type: 'huli/showModal',
                });
              }}
            >更多</Button>
          </div>
          <div style={{float: 'right', padding: '2px 0'}}>
            <Button
              className="btn"
              type="primary"
              style={{marginRight: 10}}
              onClick={handleOk}
            >查询</Button>
          </div>
          <div style={{width: 'calc(100% - 150px)'}}>
            <FormItem>
              {getFieldDecorator('keyword', {
                initialValue: filter && filter.keyword !== null && filter.keyword !== undefined ? filter.keyword : undefined,
                rules: [],
              })(<Input className="headerInput" placeholder="请输入休养员姓名进行搜索" />)}
            </FormItem>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  form: PropTypes.object,
  onFilterChange: PropTypes.func,
  onAdd: PropTypes.func,
};

export default injectIntl(connect(({huli}) => ({huli}))(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      huli: {
        filterValue,
      },
    } = props;
    dispatch({
      type: 'huli/updataFilterValue',
      payload: {
        ...filterValue,
        ...allValues,
      },
    });
  },
  mapPropsToFields(props) {
    const {
      huli,
    } = props;
    const {
      filterValue,
    } = huli;
    return {
      keyword: Form.createFormField({
        ...filterValue.keyword,
        value: filterValue.keyword ? filterValue.keyword : undefined,
      }),
      louhao: Form.createFormField({
        ...filterValue.louhao,
        value: filterValue.louhao ? filterValue.louhao : undefined,
      }),
      louceng: Form.createFormField({
        ...filterValue.louceng,
        value: filterValue.louceng ? filterValue.louceng : undefined,
      }),
      fanghao: Form.createFormField({
        ...filterValue.fanghao,
        value: filterValue.fanghao ? filterValue.fanghao : undefined,
      }),
    };
  },
})(Filter)));

