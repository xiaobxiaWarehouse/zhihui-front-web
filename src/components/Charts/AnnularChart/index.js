import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Guide, Coord, Label } from 'bizcharts';
import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight';
import styles from './index.less';


// const { DataView } = DataSet;
const { Html } = Guide;
// @autoHeight()
export default class AnnularChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [40, 'auto', 60, 'auto'],
      data,
      count,
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
          val = `${val * 100}%`;
          return val;
        },
      },
    };

    return (
      <div className={styles.lineChart} style={{ height: height + 30 }}>
        <div>
          <Chart height={height} padding={padding} data={dv} scale={cols} forceFit>
            <Axis name="x"/>
            <Coord type="theta" radius={1} innerRadius={0.75} />
            <Axis name="percent" />
            <Guide>
              <Html
                position={['50%', '50%']}
                html={`<div style="color:#595959;text-align: center;width: 10em;font-size:20px;"><div style="color:#262626;font-size:56px;">${count}</div>${title}</div>`}
                alignX="center"
                alignY="middle"
              />
            </Guide>
            <Geom
              type="intervalStack"
              position="percent"
              color={['item', ['#FCC91A', '#6F4111', '#5ACB74', '#47A1FF']]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}
