/**
 * Created by alphabeta on 17-12-16.
 */

import {getOption, chuangweiJoin} from '../index';

// const xingbie = {
//   1: '男',
//   2: '女',
// };
//
// const huliDj = {
//   1: '一级',
//   2: '二级',
//   3: '三级',
//   4: '四级',
//   5: '五级',
// };

const state = {
  A: '可用',
  X: '不可用',
};

const yuyueZhuangtai = {
  1: '待反馈',
  2: '待处理',
  3: '已完成',
  4: '已作废',
};

const yudingZhuangtai = {
  1: '待处理',
  2: '已完成',
  3: '已作废',
};

const shenqingZhuangtai = {
  1: '新建',
  2: '入院',
  3: '出院',
  4: '已作废',
};

const yuyue = {
  // id: '预约单Id',
  bianhao: '预约编号',
  // suoyin: '入住索引',
  yuyueRq: '预约日期',
  xingming: '预约休养员姓名',
  xingbie: '预约休养员性别',
  nianling: '预约休养员年龄',
  jibenQk: '预约休养员基本情况',
  canguanSj: '预约参观时间',
  lianxirenXm: '预约联系人姓名',
  lianxirenDh: '预约联系人电话',
  laiyuan: '预约来源',
  beizhu: '预约备注',
  zerenrenXm: '预约责任人姓名',
  zerenrenDh: '预约责任人电话',
  chuang: '智能床',
  chuangdian: '智能床垫',
  duotizheng: '多体征',
  // chuzhiQk: '预约处置情况',
  zhuangtai: '预约状态',
  // zerenren: '责任人Id',
  // caozuoren: '操作人Id',
  // state: '数据状态',
  // createTime: '创建时间',
};

const yuding = {
  // id: '预定单Id',
  bianhao: '预定编号',
  // suoyin: '入住索引',
  yudingRq: '预定日期',
  xingming: '预定休养员姓名',
  xingbie: '预定休养员性别',
  nianling: '预定休养员年龄',
  jibenQk: '预定休养员基本情况',
  ruzhuSj: '预定入住时间',
  huliDj: '预定护理等级',
  lianxirenXm: '预定联系人姓名',
  lianxirenDh: '预定联系人电话',
  jiezhiSj: '预定截止时间',
  beizhu: '预定备注',
  zerenrenXm: '预定责任人姓名',
  zerenrenDh: '预定责任人电话',
  chuang: '智能床',
  chuangdian: '智能床垫',
  duotizheng: '多体征',
  // chuzhiQk: '预定处置情况',
  zhuangtai: '预定状态',
  // zerenren: '责任人Id',
  // caozuoren: '操作人Id',
  chuangwei: '床位',
  // state: '数据状态',
  // createTime: '创建时间',
};

const shenqing = {
  // id: '入院申请单Id',
  bianhao: '入院编号',
  // suoyin: '入住索引',
  xingming: '入院休养员姓名',
  xingbie: '入院休养员性别',
  nianling: '入院休养员年龄',
  jiguan: '入院休养员籍贯',
  shenfenzheng: '入院休养员身份证',
  jianhurenXm: '入院监护人姓名',
  jianhurenDh: '入院监护人电话',
  yudingRq: '入院预定日期',
  yujiSj: '入院预计时间',
  shijiSj: '入院实际时间',
  huliDj: '入院护理等级',
  yibaoQk: '入院医保情况',
  bingshiQk: '入院休养员病史',
  qitaQk: '入院休养员其他情况',
  teshuZysx: '入院特殊注意事项',
  zerenyishiXm: '入院责任医师姓名',
  zerenyishiDh: '入院责任医师电话',
  huliyuanXm: '入院护理员姓名',
  huliyuanDh: '入院护理员电话',
  fuzerenXm: '入院养护部负责人姓名',
  fuzerenDh: '入院养护部负责人电话',
  chuang: '智能床',
  chuangdian: '智能床垫',
  duotizheng: '多体征',
  // chuzhiQk: '入院处置情况',
  zhuangtai: '入院状态',
  // zerenyishi: '责任医师Id',
  // huliyuan: '护理员Id',
  // fuzeren: '养护部负责人Id',
  // caozuoren: '操作人Id',
  chuangwei: '床位',
  // state: '数据状态',
  // createTime: '创建时间',
};
//
// const chuangweiJoin = (chuangweiList) => {
//   return chuangweiList.map((item) => {
//     return `${item.louhao}楼${item.louceng}层${item.fanghao}房${item.chuanghao}床`;
//   }).join(',');
// };

const convert = {
  yuyue: (obj, xingbie, huliDj) => {
    let result = '';
    Object.keys(obj).forEach((item, index) => {
      if (yuyue[item]) {
        if (item === 'xingbie') {
          result += `;${yuyue[item]}:[${getOption(obj[item].from, xingbie) || ''}]->[${getOption(obj[item].to, xingbie) || ''}]`;
        } else if (item === 'zhuangtai') {
          result += `;${yuyue[item]}:[${yuyueZhuangtai[obj[item].from] || ''}]->[${yuyueZhuangtai[obj[item].to] || ''}]`;
        } else if (item === 'chuangwei') {
          result += `;${yuyue[item]}:[${chuangweiJoin(JSON.parse(obj[item].from))}]->[${chuangweiJoin(JSON.parse(obj[item].to))}]`;
        } else if (item === 'huliDj') {
          result += `;${yuyue[item]}:[${getOption(obj[item].from, huliDj) || ''}]->[${getOption(obj[item].to, huliDj) || ''}]`;
        } else {
          result += `;${yuyue[item]}:[${obj[item].from || ''}]->[${obj[item].to || ''}]`;
        }
      }
    });
    result = result.replace(';', '');
    return result !== '' ? result.split(';') : undefined;
  },
  yuding: (obj, xingbie, huliDj) => {
    let result = '';
    Object.keys(obj).forEach((item, index) => {
      if (yuding[item]) {
        if (item === 'xingbie') {
          result += `;${yuding[item]}:[${getOption(obj[item].from, xingbie) || ''}]->[${getOption(obj[item].to, xingbie) || ''}]`;
        } else if (item === 'zhuangtai') {
          result += `;${yuding[item]}:[${yudingZhuangtai[obj[item].from] || ''}]->[${yudingZhuangtai[obj[item].to] || ''}]`;
        } else if (item === 'chuangwei') {
          result += `;${yuding[item]}:[${chuangweiJoin(JSON.parse(obj[item].from))}]->[${chuangweiJoin(JSON.parse(obj[item].to))}]`;
        } else if (item === 'huliDj') {
          result += `;${yuding[item]}:[${getOption(obj[item].from, huliDj) || ''}]->[${getOption(obj[item].to, huliDj) || ''}]`;
        } else {
          result += `;${yuding[item]}:[${obj[item].from || ''}]->[${obj[item].to || ''}]`;
        }
      }
    });
    result = result.replace(';', '');
    return result !== '' ? result.split(';') : undefined;
  },
  shenqing: (obj, xingbie, huliDj) => {
    let result = '';
    Object.keys(obj).forEach((item, index) => {
      if (shenqing[item]) {
        if (item === 'xingbie') {
          result += `;${shenqing[item]}:[${getOption(obj[item].from, xingbie) || ''}]->[${getOption(obj[item].to, xingbie) || ''}]`;
        } else if (item === 'zhuangtai') {
          result += `;${shenqing[item]}:[${shenqingZhuangtai[obj[item].from] || ''}]->[${shenqingZhuangtai[obj[item].to] || ''}]`;
        } else if (item === 'chuangwei') {
          result += `;${shenqing[item]}:[${chuangweiJoin(JSON.parse(obj[item].from))}]->[${chuangweiJoin(JSON.parse(obj[item].to))}]`;
        } else if (item === 'huliDj') {
          result += `;${shenqing[item]}:[${getOption(obj[item].from, huliDj) || ''}]->[${getOption(obj[item].to, huliDj) || ''}]`;
        } else {
          result += `;${shenqing[item]}:[${obj[item].from || ''}]->[${obj[item].to || ''}]`;
        }
      }
    });
    result = result.replace(';', '');
    return result !== '' ? result.split(';') : undefined;
  },
};

export {convert};
