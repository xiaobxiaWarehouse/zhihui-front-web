import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import queryString from 'query-string';
import Chart from './chart';

const Index = (props) => {
  const { dispatch, location, monitor } = props;
  const { lishibiaodanDtz: { list, next }, lishitubiaoValue, prev } = monitor;
  const { search } = location;
  const query = queryString.parse(search);

  const listProps = {
    pagination: false,
    location,
    dataSource: list,
    next,
    prev,
    onchangePage(type) {
      if (type === 'next') {
        prev.push(next);
      } else {
        prev.pop(next);
      }
      dispatch({
        type: 'monitor/updatePrev',
        payload: prev,
      });
      dispatch({
        type: 'monitor/getLishibiaodanDtz',
        payload: {
          ...lishitubiaoValue,
          id: Number(query.id),
          jigou: Number(query.jigou),
          nextBh: type === 'prev'
            ? prev[prev.length - 1]
              ? prev[prev.length - 1].bianhao
              : undefined
            : next.bianhao,
          nextSj:
            type === 'prev'
              ? prev[prev.length - 1]
                ? prev[prev.length - 1].shijian
                : undefined
              : next.shijian,
        },
      });
    },
    onFilterChange(value) {
      dispatch({
        type: 'monitor/updatePrev',
        payload: [],
      });
      dispatch({
        type: 'monitor/changeLishitubiaoValue',
        payload: {
          ...value,
        },
      });
      dispatch({
        type: 'monitor/getLishibiaodanDtz',
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
      <Chart {...listProps} />
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
