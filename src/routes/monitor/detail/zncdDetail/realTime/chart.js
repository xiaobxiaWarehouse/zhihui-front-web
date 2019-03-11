import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import queryString from 'query-string';
import { Charts } from 'components';
import Nav from '../nav';
import styles from './index.less';

const { ColumnChart, SliderChart } = Charts;

const navList = [
  { id: 1, name: '实时数据' },
  { id: 2, name: '睡眠分析' },
  { id: 3, name: '在离床分析' },
  { id: 4, name: '历史数据' },
];

let timer = true;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { location, dispatch, monitor } = this.props;
    const { search } = location;
    const query = queryString.parse(search);
    timer = true;
    this.getShishiZnc({ ...query });
  }

  componentWillUnmount() {
    if (timer) {
      timer = false;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/updateShishiZnc',
      payload: {
        shijian: undefined,
        hrList: [],
        rrList: [],
        mvList: [],
      },
    });
  }

  getShishiZnc = (params) => {
    const { location, dispatch, monitor } = this.props;
    const { search } = location;
    const { shishiZnc } = monitor;
    const { hrList } = shishiZnc;
    const query = queryString.parse(search);
    if (timer) {
      dispatch({
        type: 'monitor/getShishiZncd',
        payload: {
          ...params,
        },
        callback: (data) => {
          let _this = this;
          if (timer) {
            setTimeout(() => {
              _this.getShishiZnc({
                ...query,
                kaishiSj: data.shijian,
              });
            }, 1000);
          }
        },
      });
    }
  };

  render() {
    const { monitor, location } = this.props;
    const { shishiZnc } = monitor;
    const { hrList, rrList, mvList } = shishiZnc;
    let preMinutes = 3 * (60 * 1000);
    let now = new Date();

    const navProps = {
      location,
      navList,
    };

    return (
      <div>
        <div>
          <div className="monitorNav">
            <Nav {...navProps} />
          </div>
          <div className="chartW" style={{padding: 17}}>
            <Row gutter={10}>
              {hrList.length === 0 && (
                <Col>
                  <div className="empty-tip">暂无数据</div>
                </Col>
              )}
              {hrList.length > 0 && (
                <Col span={12}>
                  <div className={styles.chartBox} style={{ height: 379, marginBottom: 15 }}>
                    <SliderChart
                      height={320}
                      title="心率数据"
                      data={hrList}
                      cols={{
                        name: {
                          alias: '时间',
                          type: 'time',
                          mask: 'mm:ss',
                          tickCount: 6,
                          nice: false,
                          max: now.getTime(),
                          // max: (hrList && hrList.length > 0) ? Math.max.apply(null, hrList.map(item => item.name)) : now.getTime(),
                          min: ((hrList && hrList.length > 0) ? Math.max.apply(null, hrList.map(item => item.name)) : now.getTime()) - preMinutes,
                        },
                        number: {
                          alias: '心率',
                          min: 0,
                          max: 120,
                        },
                      }}
                    />
                  </div>
                </Col>
              )}
              {rrList.length > 0 && (
                <Col span={12}>
                  <div className={styles.chartBox} style={{ height: 379, marginBottom: 15 }}>
                    <SliderChart
                      height={320}
                      title="呼吸数据"
                      data={rrList}
                      cols={{
                        name: {
                          alias: '时间',
                          type: 'time',
                          mask: 'mm:ss',
                          tickCount: 6,
                          nice: false,
                          max: now.getTime(),
                          // max: (rrList && rrList.length > 0) ? Math.max.apply(null, rrList.map(item => item.name)) : now.getTime(),
                          min: ((rrList && rrList.length > 0) ? Math.max.apply(null, rrList.map(item => item.name)) : now.getTime()) - preMinutes,
                        },
                        number: {
                          alias: '呼吸',
                          min: 0,
                          max: 50,
                        },
                      }}
                    />
                  </div>
                </Col>
              )}
              {mvList.length > 0 && (
                <Col span={12}>
                  <div className={styles.chartBox} style={{ height: 436 }}>
                    <ColumnChart
                      height={376}
                      title="体动数据"
                      data={mvList}
                      cols={{
                        name: {
                          alias: '时间',
                          type: 'time',
                          mask: 'mm:ss',
                          tickCount: 6,
                          nice: false,
                          max: now.getTime(),
                          // max: (mvList && mvList.length > 0) ? Math.max.apply(null, mvList.map(item => item.name)) : now.getTime(),
                          min: ((mvList && mvList.length > 0) ? Math.max.apply(null, mvList.map(item => item.name)) : now.getTime()) - preMinutes,
                        },
                        number: {
                          alias: 'x',
                          min: 0,
                          max: (mvList && mvList.length > 0) && Math.max.apply(null, mvList.map(item => item.number)) > 6000 ? Math.max.apply(null, mvList.map(item => item.number)) : 6000,
                        },
                      }}
                    />
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default connect(mapStateToProps)(Form.create()(Chart));
