import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {mapper} from 'utils';
import intl from 'react-intl-universal';
import {Button, Col, Form, Input, Row, Radio} from 'antd';
import {Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Filter = (props) => {
  const {
    onAdd,
    dispatch,
    onFilterChange,
    form: {
      getFieldDecorator,
      getFieldsValue,
    },
    filter,
    filterValue,
  } = props;

  const radioOption = [
    {id: 1, value: '待反馈'},
    {id: 2, value: '待处理'},
    // {id: 3, value: '已完成'},
    // {id: 4, value: '已作废'},
    {id: -1, value: '全部'},
  ];

  const formItemLayout = {
  };

  const changeRadio = (val) => {
    let newFields = {
      ...filterValue,
    };
    let fields = getFieldsValue();
    const {target: {value}} = val;
    newFields.zhuangtai = value;
    if (fields.keyword) {
      newFields.keyword = fields.keyword;
    }
    onFilterChange(newFields);
  };

  const handleOk = (val) => {
    let fields = getFieldsValue();
    let newFields = {
      ...filterValue,
    };
    if (fields.zhuangtai) {
      newFields.zhuangtai = Number(fields.zhuangtai);
    }
    onFilterChange(newFields);
  };

  return (
    <Form>
      <Row>
        <Col>
          <FormItem>
            {getFieldDecorator('zhuangtai', {
              initialValue: filter && filter.zhuangtai !== null && filter.zhuangtai !== undefined ? filter.zhuangtai : '2',
              rules: [],
            })(<RadioGroup onChange={(val) => { changeRadio(val); }}>
              {
                radioOption.map((item) => {
                  return <Radio key={item.id} value={String(item.id)}>{item.value}</Radio>;
                })
              }
            </RadioGroup>)}
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
                  type: 'yuyue/showModal',
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
              })(<Input className="headerInput" placeholder="请输入休养员姓名/联系人姓名/联系人电话进行搜索" />)}
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

export default injectIntl(connect(({yuyue}) => ({yuyue}))(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      yuyue: {
        filterValue,
      },
    } = props;
    dispatch({
      type: 'yuyue/updataFilterValue',
      payload: {
        ...filterValue,
        ...allValues,
      },
    });
  },
  mapPropsToFields(props) {
    const {
      yuyue,
    } = props;
    const {
      filterValue,
    } = yuyue;
    return {
      keyword: Form.createFormField({
        ...filterValue.keyword,
        value: filterValue.keyword ? filterValue.keyword : undefined,
      }),
    };
  },
})(Filter)));

