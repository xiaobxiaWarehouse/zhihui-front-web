import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import queryString from 'query-string';
import Chart from './chart';

const Index = (props) => {
  const { dispatch, location } = props;

  const { search } = location;

  const query = queryString.parse(search);

  const chartProps = {
    location,
    onFilterChange(value) {
      dispatch({
        type: 'monitor/getLishiZncd',
        payload: {
          ...value,
          id: Number(query.id),
          jigou: Number(query.jigou),
        },
      });
    },
  };

  return (
    <div>
      <Chart {...chartProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
