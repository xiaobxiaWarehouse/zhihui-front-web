import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {classnames} from 'utils';
import intl from 'react-intl-universal';
import {JXRS, Layout} from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const JXRSIcon = JXRS.Icon;

const chuangweiOption = [
  {
    color: 'kong',
    name: '空闲/未使用',
  },
  {
    color: 'yiyuding',
    name: '已预定',
  },
  {
    color: 'yishiyong',
    name: '已满/已使用',
  },
  {
    color: 'baofang',
    name: '包房',
  },
  {
    color: 'bukeyong',
    name: '不可用/禁用',
  },
];
const List = (props) => {
  const {
    list,
    isBaofang,
    chuangweiStatus,
    chuangweiSelect,
    fanghaoSelect,
    selectColor,
  } = props;

  const arrayByObj = () => {
    let newList = {};
    list.forEach((item) => {
      if (!newList[item.louhao]) {
        newList[item.louhao] = {};
        newList[item.louhao][item.louceng] = {};
        newList[item.louhao][item.louceng][item.fanghao] = {};
        newList[item.louhao][item.louceng][item.fanghao][item.chuanghao] = {
          ...item,
        };
      } else if (!newList[item.louhao][item.louceng]) {
        newList[item.louhao][item.louceng] = {};
        newList[item.louhao][item.louceng][item.fanghao] = {};
        newList[item.louhao][item.louceng][item.fanghao][item.chuanghao] = {
          ...item,
        };
      } else if (!newList[item.louhao][item.louceng][item.fanghao]) {
        newList[item.louhao][item.louceng][item.fanghao] = {};
        newList[item.louhao][item.louceng][item.fanghao][item.chuanghao] = {
          ...item,
        };
      } else if (!newList[item.louhao][item.louceng][item.fanghao][item.chuanghao]) {
        newList[item.louhao][item.louceng][item.fanghao][item.chuanghao] = {
          ...item,
        };
      }
    });
    return newList;
  };

  const chuangweiRender = () => {
    let newList = arrayByObj();
    return Object.keys(newList).map((item, louhaoIndex) => {
      return Object.keys(newList[item]).map((louceng, loucengIndex) => {
        return (
          <div key={`${item}${louceng}`}>
            <div className={styles.louceng}>
              <div className={styles.loucengTitle}>
                {
                  `${item}楼-${louceng}层`
                }
              </div>
            </div>
            <div className={styles.loucengBox}>
              {
                Object.keys(newList[item][louceng]).map((fanghao, fanghaoIndex) => {
                  return (
                    <div className={styles.fanghaoBox} key={`${item}${louceng}${fanghao}`}>
                      <div
                        onClick={() => {
                          fanghaoSelect(newList[item][louceng][fanghao]);
                        }}
                        className={classnames(styles.chuangwei, isBaofang(newList[item][louceng][fanghao]))}
                      >
                        {
                          `${fanghao}房`
                        }
                      </div>
                      {
                        Object.keys(newList[item][louceng][fanghao]).map((chuangwei, chuangweiIndex) => {
                          return (
                            <div
                              key={`${item}${louceng}${fanghao}${chuangwei}`}
                              className={classnames(styles.chuangwei, chuangweiStatus(newList[item][louceng][fanghao][chuangwei]))}
                              onClick={() => {
                                chuangweiSelect(newList[item][louceng][fanghao][chuangwei]);
                              }}
                            >
                              {
                                `${chuangwei}床`
                              }
                              {
                                selectColor(newList[item][louceng][fanghao][chuangwei]) && <JXRSIcon className={CSS.selectIcon} type="select-chuangwei" />
                              }
                            </div>
                          );
                        })
                      }
                    </div>
                  );
                })
              }
            </div>
          </div>
        );
      });
    });
  };

  return (
    <div className="chuangwei">
      <div className={styles.chuangweiStatus} style={{padding: '12px 28px'}}>
        {
          chuangweiOption && chuangweiOption.map((item) => {
            return (
              <div className={styles.chuangweiItem} key={item.name}>
                <div className={classnames(styles.block, item.color)}/>
                <div className={styles.chuangweiName}>{item.name}</div>
              </div>
            );
          })
        }
      </div>
      <div className="chuagnweiBody" style={{padding: '0 28px 28px 28px'}}>
        {
          chuangweiRender()
        }
      </div>
    </div>
  );
};


List.propTypes = {
  onModalItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};


function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(List));
