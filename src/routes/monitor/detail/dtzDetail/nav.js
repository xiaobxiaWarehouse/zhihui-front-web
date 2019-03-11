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

  const getZuijinDtz = () => {
    dispatch({
      type: 'monitor/getZuijinDtz',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getLishibiaodanDtz = () => {
    dispatch({
      type: 'monitor/changeLishitubiaoValue',
      payload: {
        signType: '-1',
        zuijin: 1,
      },
    });
    dispatch({
      type: 'monitor/updatePrev',
      payload: [],
    });
    dispatch({
      type: 'monitor/getLishibiaodanDtz',
      payload: {
        signType: '-1',
        id: Number(query.id),
        jigou: Number(query.jigou),
        zuijin: 1,
      },
    });
  };

  const getLishitubiaoDtz = () => {
    dispatch({
      type: 'monitor/getLishitubiaoDtz',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
        zuijin: 1,
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
        getZuijinDtz();
        break;
      case 2:
        getLishibiaodanDtz();
        break;
      case 3:
        getLishitubiaoDtz();
        break;
      default:
        break;
    }
  };

  return (
    <div style={{padding: 15}}>
      <div style={{width: 460, display: 'inline-block'}}>
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
      <div style={{width: 275, float: 'right'}}>
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
