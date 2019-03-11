import React from 'react';
import moment from 'moment';
import { Chart, Tooltip, Geom, Legend, Axis, Coord } from 'bizcharts';
import styles from './index.less';

export default class AreaChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [40, 'auto', 60, 'auto'],
      data = [],
      color = '#FCCE30',
      cols = {},
    } = this.props;

    return (
      <div className={styles.chart} style={{ height: height + 30 }}>
        <div>
          {title && <h4>{title}</h4>}
          <Chart
            className="bizChartGlobal"
            height={height}
            padding={padding}
            data={data}
            scale={cols}
            forceFit
            animate={false}
            placeholder
            // onGetG2Instance={(g2Chart) => {}}
          >
            {/* <Tooltip /> */}
            <Axis name="name" subTickCount={3} />
            <Geom
              type="area"
              position="name*number"
              color={['number', [color]]}
              tooltip={[
                'name*number',
                (name, number) => {
                  return {
                    name: moment(name).format('mm:ss'),
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
              tooltip={[
                'name*number',
                (name, number) => {
                  return {
                    name: moment(name).format('mm:ss'),
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
