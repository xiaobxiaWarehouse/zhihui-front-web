import React from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import {Button} from 'antd';
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

  const getShishiZncd = () => {};

  const getShumianZncd = () => {
    dispatch({
      type: 'monitor/getShumianZncd',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getZailichuangZncd = () => {
    dispatch({
      type: 'monitor/getZailichuangZncd',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getLishiZncd = () => {
    dispatch({
      type: 'monitor/getLishiZncd',
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
        getShishiZncd();
        break;
      case 2:
        getShumianZncd();
        break;
      case 3:
        getZailichuangZncd();
        break;
      case 4:
        getLishiZncd();
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
