import React from 'react';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import {Button, Col, Form, Row, message} from 'antd';
import {JXRS, Layout, Permissions} from 'components';
import moment from 'moment';
import styles from '../index.less';

import ZncyuzhiList from './zncyuzhiList';
import ZncdyuzhiList from './zncdyuzhiList';
import DtzyuzhiList from './dtzyuzhiList';
import ZhxyuzhiList from './zhxyuzhiList';

const JXRSIcon = JXRS.Icon;

const List = (props) => {
  const {
    dispatch,
    unTying,
    app: {
      viewJigou,
      isFormChange,
    },
    ruyuan: {
      cunrrTabIndex,
      allValues,
      zncData,
      zncdData,
      dtzData,
    },
    changeTab,
    location,
  } = props;
  const { search } = location;
  const query = queryString.parse(search);
  const getZnc = () => {
    const {
      bianhao,
      tixing,
      hrmin,
      hrmax,
      rrmin,
      rrmax,
      onbed,
      offbed,
      hrStart,
      hrEnd,
      rrStart,
      rrEnd,
      bedStart,
      bedEnd,
      hrduration,
      rrduration,
    } = allValues;
    let params = {
      bianhao,
      id: zncData.id,
      jigou: Number(query.jigou),
      suoyin: Number(query.suoyin),
      tixing: Number(tixing),
    };
    if (!bianhao) {
      message.error('设备编号必须填写');
      return;
    }
    if (Number(tixing) === 2) {
      let isEmpty = Object.values(allValues).every((item) => {
        return item !== undefined && item !== null;
      });
      if (!isEmpty) {
        message.error('所有阈值必须填写');
        return;
      }
      params.yuzhi = JSON.stringify({
        bed: {
          start: moment(bedStart).format('HH:mm:ss'),
          end: moment(bedEnd).format('HH:mm:ss'),
          offbed,
          onbed,
        },
        hr: {
          start: moment(hrStart).format('HH:mm:ss'),
          end: moment(hrEnd).format('HH:mm:ss'),
          max: hrmax,
          min: hrmin,
          duration: hrduration,
        },
        rr: {
          start: moment(rrStart).format('HH:mm:ss'),
          end: moment(rrEnd).format('HH:mm:ss'),
          max: rrmax,
          min: rrmin,
          duration: rrduration,
        },
      });
    }
    dispatch({
      type: 'ruyuan/modifyZnc',
      payload: params,
      callback: () => {
        message.success('绑定成功');
        dispatch(routerRedux.push({
          pathname: '/ruzhu/list',
          search: queryString.stringify({
            ...query,
          }),
        }));
      },
    });
  };

  const getZncd = () => {
    const {
      bianhao,
      tixing,
      hrmin,
      hrmax,
      rrmin,
      rrmax,
      onbed,
      offbed,
      hrStart,
      hrEnd,
      rrStart,
      rrEnd,
      bedStart,
      bedEnd,
      hrduration,
      rrduration,
    } = allValues;
    let params = {
      bianhao,
      id: zncdData.id,
      jigou: Number(query.jigou),
      suoyin: Number(query.suoyin),
      tixing: Number(tixing),
    };
    if (!bianhao) {
      message.error('设备编号必须填写');
      return;
    }
    if (Number(tixing) === 2) {
      let isEmpty = Object.values(allValues).every((item) => {
        return item !== undefined && item !== null;
      });
      if (!isEmpty) {
        message.error('所有阈值必须填写');
        return;
      }
      params.yuzhi = JSON.stringify({
        bed: {
          start: moment(bedStart).format('HH:mm:ss'),
          end: moment(bedEnd).format('HH:mm:ss'),
          offbed,
          onbed,
        },
        hr: {
          start: moment(hrStart).format('HH:mm:ss'),
          end: moment(hrEnd).format('HH:mm:ss'),
          max: hrmax,
          min: hrmin,
          duration: hrduration,
        },
        rr: {
          start: moment(rrStart).format('HH:mm:ss'),
          end: moment(rrEnd).format('HH:mm:ss'),
          max: rrmax,
          min: rrmin,
          duration: rrduration,
        },
      });
    }
    dispatch({
      type: 'ruyuan/modifyZncd',
      payload: params,
      callback: () => {
        message.success('绑定成功');
        dispatch(routerRedux.push({
          pathname: '/ruzhu/list',
          search: queryString.stringify({
            ...query,
          }),
        }));
      },
    });
  };
  const getDtz = () => {
    const {
      bianhao,
      tixing,
      moren,
      hrmin,
      hrmax,
      sbpmin,
      sbpmax,
      dbpmin,
      dbpmax,
      tempmin,
      tempmax,
      bgmin,
      bgmax,
      spo2min,
      spo2max,
    } = allValues;
    let params = {
      bianhao,
      id: dtzData.id,
      jigou: Number(query.jigou),
      suoyin: Number(query.suoyin),
      tixing: Number(tixing),
      moren: Number(moren),
    };
    if (!bianhao) {
      message.error('设备编号必须填写');
      return;
    }
    if (Number(tixing) === 2) {
      let isEmpty = Object.values(allValues).every((item) => {
        return item !== undefined && item !== null;
      });
      if (!isEmpty) {
        message.error('所有阈值必须填写');
        return;
      }
      params.yuzhi = JSON.stringify({
        hr: {
          min: hrmin,
          max: hrmax,
        },
        sbp: {
          min: sbpmin,
          max: sbpmax,
        },
        dbp: {
          min: dbpmin,
          max: dbpmax,
        },
        temp: {
          min: tempmin,
          max: tempmax,
        },
        bg: {
          min: bgmin,
          max: bgmax,
        },
        spo2: {
          min: spo2min,
          max: spo2max,
        },
      });
    }
    dispatch({
      type: 'ruyuan/modifyDtz',
      payload: params,
      callback: () => {
        message.success('绑定成功');
        dispatch(routerRedux.push({
          pathname: '/ruzhu/list',
          search: queryString.stringify({
            ...query,
          }),
        }));
      },
    });
  };

  const getZhx = () => {
    const {
      bianhao,
    } = allValues;
    let params = {
      bianhao,
    };
    if (!bianhao) {
      message.error('设备编号必须填写');
      return;
    }
    dispatch({
      type: 'ruyuan/modifyZhx',
      payload: params,
      callback: () => {
        message.success('绑定成功');
        dispatch(routerRedux.push({
          pathname: '/ruzhu/list',
          search: queryString.stringify({
            ...query,
          }),
        }));
      },
    });
  };
  const navMenu = [
    { id: 1, name: '智能床' },
    { id: 2, name: '智能床垫' },
    { id: 3, name: '多体征设备' },
    { id: 4, name: '智汇鞋' },
  ];
  const listProps = {
    location,
  };
  const onBack = (type) => {
    if (isFormChange) {
      dispatch({
        type: 'app/changeModalVisible',
        payload: {
          modalVisible: true,
          type,
        },
      });
    } else if (type === 1) {
      dispatch(routerRedux.push({
        pathname: '/ruzhu/list',
        search: queryString.stringify({
          ...query,
        }),
      }));
    } else {
      dispatch(routerRedux.push({pathname: type}));
    }
  };
  const save = (params) => {
    if (cunrrTabIndex === 1) {
      // 智能床垫
      getZncd(params);
    } else if (cunrrTabIndex === 2) {
      // 多体征设备
      getDtz(params);
    } else if (cunrrTabIndex === 3) {
      // 智汇鞋
      getZhx(params);
    } else {
      // 智能床
      getZnc(params);
    }
  };
  const shebeiProps = {
    location,
    save,
  };
  return (
    <div className="bgWhite">
      <div className="header">
        <div className="navGroup">
          <Row className="nav">
            <Col className="title">设备绑定</Col>
            <Col className="navBtn">
              <Button
                type="primary"
                style={{marginRight: 10}}
                onClick={() => {
                  onBack(1);
                }}
              ><JXRSIcon type="left"/> 返回</Button>
              <Permissions all="sys:suoyin:bangding">
                <Button
                  type="primary"
                  style={{marginRight: 10}}
                  onClick={() => {
                    unTying(cunrrTabIndex);
                  }}
                ><JXRSIcon type="untying"/> 解绑</Button>
                <Button
                  type="primary"
                  style={{marginRight: 10}}
                  onClick={() => {
                    save(allValues);
                  }}
                ><JXRSIcon type="save"/> 保存</Button>
              </Permissions>
              <Button
                type="primary"
                style={{marginRight: 10}}
                onClick={() => {
                  dispatch({
                    type: 'app/changeIsHomeBack',
                    payload: true,
                  });
                  onBack('/home');
                }}
              ><JXRSIcon type="home"/> 首页</Button>
            </Col>
          </Row>
        </div>
      </div>
      <Form>
        <Row className={styles.color}>
          <Col span={6} className={styles.nav}>
            {
              navMenu.map((item, index) => {
                return (
                  <Row
                    key={item.id}
                    className={
                      cunrrTabIndex + 1 === item.id
                        ? styles.tabActiveItem
                        : styles.tabItem
                    }
                    onClick={() => {
                      changeTab(index);
                    }}
                  >
                    <Col>
                      {item.name}
                    </Col>
                  </Row>
                );
              })
            }
          </Col>
          <Col span={18} className={styles.shebeiContent}>
            {!cunrrTabIndex && <ZncyuzhiList {...listProps} />}
            {cunrrTabIndex === 1 && <ZncdyuzhiList {...listProps} />}
            {cunrrTabIndex === 2 && <DtzyuzhiList {...listProps} />}
            {cunrrTabIndex === 3 && <ZhxyuzhiList {...listProps} />}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create({
  onValuesChange(props, values) {
    const {
      dispatch,
    } = props;
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  },
})(List)));

