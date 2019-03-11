import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Coord } from 'bizcharts';
import moment from 'moment';
import styles from './index.less';

// @autoHeight()
export default class AreaChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [40, 'auto', 60, 'auto'],
      data = [],
      color = '#FCCE30',
      mask = 'HH:mm',
      max = 100,
    } = this.props;

    const colsName = {
      type: 'time',
      mask,
    };

    if (data.length > 1) {
      colsName.tickCount = 5;
    } else {
      colsName.tickInterval = 24 * 60 * 60 * 1000;
    }

    const cols = {
      name: {
        ...colsName,
      },
      number: {
        min: 0,
        max,
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
                offset: 12,
              }}
            />
            {/* <Tooltip /> */}
            <Geom
              type="area"
              position="name*number"
              color={['number', [color]]}
              tooltip={[
                'name*number',
                (name, number) => {
                  return {
                    name: moment(name).format('MM-DD HH:mm'),
                    title: ' ',
                    value: number,
                  };
                },
              ]}
            />
            <Geom
              type="line"
              position="name*number"
              color={['number', [color]]}
              size={2}
              tooltip={[
                'name*number',
                (name, number) => {
                  return {
                    name: moment(name).format('MM-DD HH:mm'),
                    title: ' ',
                    value: number,
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
