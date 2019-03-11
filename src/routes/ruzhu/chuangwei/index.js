import React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'dva';
import {message} from 'antd';

import List from './List';
import Filter from './Filter';


const colorArr = [
  'kong',
  'yiyuding',
  'shenqing',
  'yishiyong',
  'bukeyong',
  'xuanzhong',
  'baofang',
];

const Index = (props) => {
  const {
    ruyuan,
    dispatch,
    screen,
    suoyin,
  } = props;

  const {
    chuangweiList,
    chuangweiSelectItem,
    editData,
    currentSelectData,
    optional,
    chuzhiDz,
    savaChuangwei,
  } = ruyuan;

  const filterProps = {
    editData,
    chuangweiSelectItem,
    onFilterChange (value) {
      let params = {
        screen,
        suoyin,
      };
      dispatch({
        type: 'ruyuan/updateFilter',
        payload: {
          filter: {
            zhuangtai: value.zhuangtai,
            louhao: value.louhao,
            cenghao: value.cenghao,
          },
        },
      });
      if (currentSelectData && currentSelectData.suoyin) {
        params.suoyin = currentSelectData && currentSelectData.suoyin;
      }
      dispatch({
        type: 'ruyuan/getChuangwei',
        payload: {
          ...params,
          ...value,
        },
      });
    },
    onBack () {
      dispatch({
        type: 'ruyuan/updateFilter',
        payload: {
          filter: null,
        },
      });
      dispatch({
        type: 'ruyuan/hideChuangweiModal',
        payload: {
          savaChuangwei,
        },
      });
    },
    onSave () {
      dispatch({
        type: 'ruyuan/updateFilter',
        payload: {
          filter: null,
        },
      });
      dispatch({
        type: 'ruyuan/hideChuangweiModal',
        payload: {
          savaChuangwei: chuangweiSelectItem,
        },
      });
    },
  };

  const isBaofang = (item) => {
    let color = 'kong';
    for (let k in item) {
      if (item[k].baofang === 2) {
        if (item[k].zhuangtai === 6) {
          color = 'xuanzhong';
        } else {
          color = 'baofang';
        }
      }
    }
    return color;
  };

  const listProps = {
    list: chuangweiList,
    isBaofang,
    selectColor(item) {
      let select = false;
      if (optional) {
        optional.forEach((k) => {
          if (item.id === k.id) {
            select = true;
          }
        });
      }
      return select;
    },
    selectBaofang(item) {
      let select = false;
      Object.keys(item).forEach((key) => {
        if (optional) {
          optional.forEach((t) => {
            if (t.id === item[key].id && (t.shenqingBaofang === 2 || t.yudingBaofang === 2)) {
              select = true;
            }
          });
        }
      });
      return select;
    },
    chuangweiStatus (item) {
      let color;
      if (item.baofang === 2 && (item.zhuangtai === 2 || item.zhuangtai === 3 || item.zhuangtai === 4)) {
        color = colorArr[colorArr.length - 1];
      } else {
        color = colorArr[item.zhuangtai - 1];
      }
      return color;
    },
    chuangweiSelect (item) {
      let isModify = chuzhiDz === 4 || chuzhiDz === 5 || (editData && editData.zhuangtai === 3 && chuzhiDz === 2) || (editData && editData.zhuangtai === 4 && chuzhiDz === 2);
      let isSelect = false;
      let isMy = optional && optional.length > 0 ? optional.some((k) => {
        return k.id === item.id;
      }) : false;
      if (item.zhuangtai === 1 || (isMy && item.zhuangtai !== 6)) {
        isSelect = true;
      }
      if (item.zhuangtai === 1 || item.zhuangtai === 6 || isMy || isModify) {
        dispatch({
          type: 'ruyuan/chuangweiSelect',
          payload: {
            isSelect: isModify ? !(item.zhuangtai === 6) : isSelect,
            chuangwei: item,
          },
        });
      } else {
        message.error('当前床位不可选');
      }
    },
    fanghaoSelect (item) {
      let list = [];
      let state = false;
      let isModify = chuzhiDz === 4 || chuzhiDz === 5 || (editData && editData.zhuangtai === 2 && chuzhiDz === 2) || (editData && editData.zhuangtai === 3 && chuzhiDz === 2);
      if (isModify) {
        list = Object.keys(item).map((k) => {
          return item[k];
        });
      } else {
        state = Object.keys(item).every((k) => {
          return item[k].zhuangtai === 1 || item[k].zhuangtai === 6;
        });
      }

      let itemIds = Object.keys(item).map((k) => {
        list.push(item[k]);
        return item[k].id;
      });

      let myChuangweiIds = optional.map((k) => {
        return k.id;
      });

      let isMy = itemIds.every((k) => {
        return myChuangweiIds.indexOf(k) > -1;
      });

      if (state || isMy || isModify) {
        dispatch({
          type: 'ruyuan/fanghaoSelect',
          payload: list,
        });
      } else {
        message.error('当前房间不可包房');
      }
    },
  };

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
