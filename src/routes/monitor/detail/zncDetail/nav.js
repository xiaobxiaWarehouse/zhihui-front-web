import React from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import { Button } from 'antd';
import styles from './index.less';

const Nav = (props) => {
  const {
    navList = [],
    monitor,
    dispatch,
    location,
    filter,
  } = props;

  const { search } = location;

  const query = queryString.parse(search);

  const { cuurrNavIndex } = monitor;

  const getShishiZnc = () => {};

  const getShumianZnc = () => {
    dispatch({
      type: 'monitor/getShumianZnc',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getZailichuangZnc = () => {
    dispatch({
      type: 'monitor/getZailichuangZnc',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getLishiZnc = () => {
    dispatch({
      type: 'monitor/getLishiZnc',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const onChangeNav = (id) => {
    dispatch({
      type: 'monitor/changeCuurrNavIndex',
      payload: id,
    });
    switch (id) {
      case 1:
        getShishiZnc();
        break;
      case 2:
        getShumianZnc();
        break;
      case 3:
        getZailichuangZnc();
        break;
      case 4:
        getLishiZnc();
        break;
      default:
        break;
    }
  };

  return (
    <div style={{padding: 15}}>
      <div style={{width: 500, display: 'inline-block'}}>
        {navList.map((item, index) => {
          return (
            <Button
              onClick={() => {
                onChangeNav(item.id);
              }}
              style={{marginRight: 15}}
              key={item.id}
              className={
                cuurrNavIndex === Number(index + 1)
                  ? styles.navActiveItem
                  : styles.navItem
              }
            >
              {item.name}
            </Button>
          );
        })}
      </div>
      <div style={{float: 'right'}}>
        {
          filter
        }
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

export default connect(mapStateToProps)(Nav);
