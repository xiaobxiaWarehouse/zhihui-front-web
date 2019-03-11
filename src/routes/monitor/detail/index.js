import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button } from 'antd';
import queryString from 'query-string';
import { routerRedux } from 'dva/router';
import { JXRS } from 'components';
import Personaldata from './personaldata';
import Tabs from './tabs';
import ZncDetail from './zncDetail';
import ZncdDetail from './zncdDetail';
import DtzDetail from './dtzDetail';

const JXRSIcon = JXRS.Icon;

const Index = (props) => {
  const {
    history, monitor, dispatch, location,
  } = props;

  const { detaiTabIndex, detailData, showDetail } = monitor;
  const { search } = location;
  const query = queryString.parse(search);

  const personaldataProps = {
    detailData,
    showDetail,
  };

  const zncDetailProps = {
    location,
  };

  const zncdDetailProps = {
    location,
  };

  const dtzDetaillProps = {
    location,
  };

  const tabsProps = {
    detailData,
    detaiTabIndex,
    onClickTab(id) {
      dispatch({
        type: 'monitor/initState',
      });
      dispatch({
        type: 'monitor/changeDetaiTabIndex',
        payload: id,
      });
      if (id === 3) {
        dispatch({
          type: 'monitor/getZuijinDtz',
          payload: {
            id: Number(query.id),
            jigou: Number(query.jigou),
          },
        });
      }
    },
  };

  return (
    <div className="content-detail">
      <div className="add-wrap">
        <div className="header">
          <div className="navGroup">
            <Row className="nav">
              <Col className="title">监测详情</Col>
              <Col className="navBtn">
                <Button
                  type="primary"
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <JXRSIcon type="left" /> 返回
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch({
                      type: 'app/changeIsHomeBack',
                      payload: true,
                    });
                    dispatch(routerRedux.push({ pathname: '/home' }));
                  }}
                >
                  <JXRSIcon type="home" /> 首页
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <Personaldata {...personaldataProps} />
        <Tabs {...tabsProps} />
        {detaiTabIndex === 1 && <ZncDetail {...zncDetailProps} />}
        {detaiTabIndex === 2 && <ZncdDetail {...zncdDetailProps} />}
        {detaiTabIndex === 3 && <DtzDetail {...dtzDetaillProps} />}
      </div>
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
