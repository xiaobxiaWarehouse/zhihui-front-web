import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Guide, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight';
import styles from './index.less';


// const { DataView } = DataSet;
const { Html } = Guide;
// @autoHeight()
export default class CakeChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [40, 'auto', 60, 'auto'],
      data,
    } = this.props;

    const dv = new DataSet.View();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          let t = Math.round(val * 10000) / 100;
          val = `${t === Math.floor(t) ? t : (t).toFixed(2)}%`;
          return val;
        },
      },
    };

    return (
      <div className={styles.lineChart} style={{ height: height + 30 }}>
        <div>
          <Chart height={height} padding={padding} data={dv} scale={cols} forceFit>
            <Coord type="theta" radius={1} />
            <Axis name="percent"/>
            {/* <Legend
              position="right"
              offsetY={-window.innerHeight / 2 + 120}
              offsetX={-100}
            /> */}
            <Axis name="percent" />
            <Geom
              type="intervalStack"
              position="percent"
              color={['item', ['#FCC91A', '#6F4111', '#5ACB74', '#47A1FF']]}
            >
              <Label
                content="percent"
                formatter={(val, item) => {
                  return `${item.point.item}：${val}`;
                }}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}
