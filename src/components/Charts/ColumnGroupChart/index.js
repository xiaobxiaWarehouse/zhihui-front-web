import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Coord } from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from './index.less';

// @autoHeight()
export default class ColumnGroupChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [40, 'auto', 60, 'auto'],
      data = [],
      transformObj,
    } = this.props;

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      ...transformObj,
    });

    let len = 0;
    if (data.length > 0) {
      len = Object.keys(data[0]).filter((item) => {
        return item !== 'name';
      }).length;
    }

    if (this.chart && len < 8) {
      this.chart.forceFit();
    }

    return (
      <div className={styles.chart} style={{ height: height + 30 }}>
        <div style={{ width: len * 200 }}>
          <div className={styles.titleBox}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: '#6F4111' }}
                />
                人员总数
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: '#FCC91A' }}
                />
                智能床
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: '#5ACB74' }}
                />
                智能床垫
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: '#47A1FF' }}
                />
                多体征设备
              </div>
            </div>
          </div>
          <Chart
            style={{ marginTop: 20 }}
            height={height}
            padding={padding}
            data={dv}
            width={len * 200}
            // forceFit
            onGetG2Instance={(chart) => {
              this.chart = chart;
            }}
          >
            <Axis name="groupName" />
            <Axis name="number" />
            {/* <Tooltip /> */}
            <Geom
              type="interval"
              position="groupName*number"
              adjust={[
                {
                  type: 'dodge',
                  marginRatio: 1 / 32,
                },
              ]}
              color={['name', ['#6F4111', '#FCC91A', '#5ACB74', '#47A1FF']]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}
