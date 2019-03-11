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
    onFilterChange,
    form: {
      getFieldDecorator,
      getFieldsValue,
    },
    filter,
    filterValue,
    dispatch,
  } = props;

  const formItemLayout = {
  };

  const radioOption = [
    {id: 1, value: '待办理'},
    {id: 2, value: '待评估'},
    {id: 3, value: '待体检'},
    {id: 4, value: '待建档'},
    {id: -2, value: '待入住'},
    {id: -3, value: '已离院'},
    {id: -1, value: '全部'},
  ];

  const changeRadio = (val) => {
    let newFields = {
      ...filterValue,
    };
    let fields = getFieldsValue();
    const {target: {value}} = val;
    newFields.danganZt = value;
    if (fields.keyword) {
      newFields.keyword = fields.keyword;
    }
    onFilterChange(newFields);
  };

  const handleOk = () => {
    let fields = getFieldsValue();
    let newFields = {
      ...filterValue,
    };
    if (fields.danganZt) {
      newFields.danganZt = Number(fields.danganZt);
    }
    onFilterChange(newFields);
  };

  return (
    <Form>
      <Row>
        <Col>
          <FormItem>
            {getFieldDecorator('danganZt', {
              initialValue: filter && filter.danganZt !== null && filter.danganZt !== undefined ? filter.danganZt : '-2',
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
      <Row>
        <Col span={24}>
          <div style={{float: 'right', padding: '2px 0'}}>
            <Button
              className="btn"
              type="primary"
              style={{marginRight: 0}}
              onClick={() => {
                dispatch({
                  type: 'ruyuan/getBumenAll',
                  callback: () => {
                    dispatch({
                      type: 'ruyuan/showModal',
                    });
                  },
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
                initialValue: filter && filter.keyword !== null && filter.keyword !== undefined ? filter.keyword : '',
                rules: [],
              })(<Input className="headerInput" placeholder="请输入休养员姓名/监护人姓名/监护人电话进行搜索" />)}
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
    dispatch({
      type: 'ruyuan/updataFilterValue',
      payload: {
        ...filterValue,
        ...allValues,
      },
    });
  },
  mapPropsToFields(props) {
    const {
      ruyuan,
    } = props;
    const {
      filterValue,
    } = ruyuan;
    return {
      keyword: Form.createFormField({
        ...filterValue.keyword,
        value: filterValue.keyword ? filterValue.keyword : undefined,
      }),
    };
  },
})(Filter)));

