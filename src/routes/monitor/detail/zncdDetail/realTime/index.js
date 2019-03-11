import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import Chart from './chart';

const Index = (props) => {
  const { location } = props;

  const chartProps = {
    location,
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
