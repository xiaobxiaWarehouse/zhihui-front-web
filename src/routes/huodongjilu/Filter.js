import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Button, Col, Form, Input, Row, Radio} from 'antd';
import {Layout} from 'components';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Filter = (props) => {
  const {
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
    {id: 1, value: '待完善资料'},
    {id: -1, value: '全部'},
  ];

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
        <FormItem>
          {getFieldDecorator('zhuangtai', {
            initialValue: filter && filter.zhuangtai !== null && filter.zhuangtai !== undefined ? filter.zhuangtai : '-1',
            rules: [],
          })(<RadioGroup onChange={(val) => { changeRadio(val); }}>
            {
              radioOption.map((item) => {
                return <Radio key={item.id} value={String(item.id)}>{item.value}</Radio>;
              })
            }
          </RadioGroup>)}
        </FormItem>
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
                  type: 'huodongjilu/showModal',
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
              })(<Input className="headerInput" placeholder="请输入活动主题/项目/名称进行搜索" />)}
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

export default injectIntl(connect(({huodongjilu}) => ({huodongjilu}))(Form.create({
  onValuesChange(props, values, allValues) {
    const {
      dispatch,
      huodongjilu: {
        filterValue,
      },
    } = props;
    dispatch({
      type: 'huodongjilu/updataFilterValue',
      payload: {
        ...filterValue,
        ...allValues,
      },
    });
  },
  mapPropsToFields(props) {
    const {
      huodongjilu,
    } = props;
    const {
      filterValue,
    } = huodongjilu;
    return {
      keyword: Form.createFormField({
        ...filterValue.keyword,
        value: filterValue.keyword ? filterValue.keyword : undefined,
      }),
    };
  },
})(Filter)));

