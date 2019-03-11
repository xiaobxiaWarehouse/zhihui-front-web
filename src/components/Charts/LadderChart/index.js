import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Coord } from 'bizcharts';
import DataSet from '@antv/data-set';
import moment from 'moment';
import autoHeight from '../autoHeight';
import styles from './index.less';

const getText = (text) => {
  if (text === 2) {
    return '在床';
  } else if (text === 0) {
    return '无信号';
  } else if (text === 1) {
    return '离床';
  }
};

// @autoHeight()
export default class LadderChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [40, 'auto', 60, 'auto'],
      data = [],
      color = '#FCCE30',
      mask = 'HH:mm',
      tickCount = 7,
    } = this.props;

    const cols = {
      name: {
        alias: '时间',
        type: 'timeCat',
        mask,
        tickCount,
        range: [0, 1],
      },
      number: {
        min: 0,
        max: 2,
      },
    };

    return (
      <div className={styles.chart} style={{ height: height + 30 }}>
        <div>
          {title && <h4>{title}</h4>}
          <Chart
            height={height}
            padding={padding}
            data={data}
            scale={cols}
            forceFit
          >
            <Axis name="name" />
            <Axis
              name="number"
              label={{
                formatter: (text, item, index) => {
                  if (text === '2') {
                    return '在床';
                  } else if (text === '0') {
                    return '无信号';
                  } else if (text === '1') {
                    return '离床';
                  }
                },
              }}
            />
            {/* <Tooltip /> */}
            <Geom
              type="line"
              position="name*number"
              color={['number', [color]]}
              size={2}
              shape="hv"
              style={{
                lineWidth: 1,
              }}
              tooltip={[
                'name*number',
                (name, number) => {
                  return {
                    name: moment(name).format('MM-DD HH:mm'),
                    title: ' ',
                    value: getText(number),
                  };
                },
              ]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}
