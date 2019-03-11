import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Coord } from 'bizcharts';
import moment from 'moment';
import styles from './index.less';

// @autoHeight()
export default class ColumnChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [40, 'auto', 60, 'auto'],
      data = [],
      color = '#6F4111',
      coord = true,
      cols = {},
    } = this.props;

    if (this.chart) {
      this.chart.forceFit();
    }

    return (
      <div className={styles.chart} style={{ height: height + 30 }}>
        <div>
          {title && <h4 style={{ marginBottom: -15 }}>{title}</h4>}
          <Chart
            className="bizChartGlobal"
            height={height}
            padding={padding}
            data={data}
            scale={cols}
            forceFit
            animate={false}
            onGetG2Instance={(chart) => {
              this.chart = chart;
            }}
          >
            {/* {coord && <Coord transpose />} */}
            <Axis name="name" subTickCount={3} />
            {/* <Tooltip /> */}
            <Geom
              type="interval"
              position="name*number"
              color={['number', [color]]}
              tooltip={[
                'name*number',
                (name, number) => {
                  return {
                    name: cols && cols.name && cols.name.type === 'time'
                      ? moment(name).format('mm:ss')
                      : name,
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
