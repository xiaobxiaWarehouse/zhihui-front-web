import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const tabList = [
  {
    id: 1,
    name: '智能床',
    zhi: 'chuang',
    zhiTime: 'chuangTimes',
  },
  {
    id: 2,
    name: '智能床垫',
    zhi: 'chuangdian',
    zhiTime: 'chuangdianTimes',
  },
  {
    id: 3,
    name: '多体征设备',
    zhi: 'duotizheng',
    zhiTime: 'duotizhengTimes',
  },
];

const Tabs = (props) => {
  const {
    detaiTabIndex,
    onClickTab,
    detailData,
  } = props;

  return (
    <div className={styles.tabsBox}>
      {
        tabList.filter((item) => {
          return detailData && (detailData[item.zhi] || detailData[item.zhiTime]);
        }).map((item) => {
          return (
            <div
              onClick={() => { onClickTab(item.id); }}
              key={item.id}
              className={detaiTabIndex === item.id ? styles.tabActiveItem : styles.tabItem}
            >
              {item.name}
            </div>
          );
        })
      }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitor: state.monitor,
  };
}

export default (connect(mapStateToProps)(Tabs));

