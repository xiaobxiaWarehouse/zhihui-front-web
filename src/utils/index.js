/* global window */
import classnames from 'classnames';
import lodash from 'lodash';
import config from './config';
import {FORM, request} from './request';
import mapper from './mapper';
// import {color} from './theme';
import AppError from './AppError';
import rsa from './rsa';
import upload from './upload';
import {convert} from './biangeng';

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
};

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array);
  let result = [];
  let hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    let hashVP = hash[item[pid]];
    if (!item.isHide) {
      if (hashVP) {
        if (!hashVP[children]) {
          hashVP[children] = [];
        }
        hashVP[children].push(item);
      } else {
        result.push(item);
      }
    }
  });
  return result;
};

const permissionCode = (array) => {
  return array.map((item) => {
    return item.code;
  });
};

const filterMenu = (permission, menuList) => {
  let codeList = permissionCode(permission);
  const newMenus = [];
  let newMenu = {};
  menuList.forEach((item) => {
    let state = item.code.some((c) => {
      return codeList.indexOf(c) > -1 || c === 'sys:user:url:logout' || c === 'sys:profile:url:mima';
    });
    if (state) {
      newMenu = {
        id: item.id,
        code: item.code,
        name: item.name,
        path: item.path,
        url: item.url,
        icon: item.icon,
        sideMenu: item.sideMenu,
      };
      newMenu.children = item.children && item.children.length > 0 ? filterMenu(permission, item.children) : [];
      newMenus.push(newMenu);
    }
  });
  return newMenus;
};

const getMenuPath = (menu, path) => {
  for (let item in menu) {
    if ({}.hasOwnProperty.call(menu, item)) {
      if (menu[item].path === path) {
        return menu[item];
      }
      if (menu[item].children) {
        let result = getMenuPath(menu[item].children, path);
        if (result) {
          return result;
        }
      }
    }
  }
};

const getMenuByCode = (menu, code) => {
  for (let item in menu) {
    if ({}.hasOwnProperty.call(menu, item)) {
      if (menu[item].code === code) {
        return menu[item];
      }
      if (menu[item].children) {
        let result = getMenuPath(menu[item].children, path);
        if (result) {
          return result;
        }
      }
    }
  }
};

const stringToNumber = (array) => {
  let newArray = array && array.map((item) => {
    return parseInt(item.id, 10);
  });
  return newArray;
};

const numberToString = (number) => {
  return `${number}`;
};

const createTime = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  let hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  let minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  let seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const typeNameToValue = (typeArray, name) => {
  let val;
  typeArray.forEach((item) => {
    if (item.name === name) {
      val = item.id;
    }
  });
  return val;
};

const hashPath = (hash) => {
  const regExp = /^(?:#)((?:\/[0-9a-zA-Z_!~*'().;:@&=+$,%#-]*)*)?(?:\?[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]*)?$/i;
  const matchResult = hash && hash.match(regExp);
  if (matchResult && matchResult.length > 1) {
    return matchResult[1];
  }
};

const getCap = (data) => {
  let obj = {};
  try {
    const {document: {section}} = data;
    section.forEach((item) => {
      if (item && item.item && item.item.constructor === Array) {
        item.item.forEach((k) => {
          if (k._type === 'radio' || k._type === 'checkbox') {
            obj[k._id] = {
              cap: k._cap,
              children: k.option.map((o) => {
                return {
                  value: o._value,
                  content: o.__text,
                };
              }),
            };
          } else if (k._type === 'mixed') {
            k.subitem.forEach((t) => {
              if (t._type === 'radio' || t._type === 'checkbox') {
                obj[t._id] = {
                  cap: k._cap,
                  children: t.option.map((o) => {
                    return {
                      value: o._value,
                      content: o.__text,
                    };
                  }),
                };
              } else {
                obj[t._id] = t._cap || k._cap;
              }
            });
          } else if (k._type === 'list' || k._type === 'table') {
            k.subitem.forEach((t) => {
              obj[t._id] = t._cap;
            });
          } else {
            obj[k._id] = k._cap;
          }
        });
      } else if (item && item.item && item.item.subitem) {
        item.item.subitem.forEach((c) => {
          if (c._type === 'checkbox') {
            obj[c._id] = {
              _cap: item.item._cap,
              children: c.option.map((o) => {
                return {
                  value: o._value,
                  content: o.__text,
                };
              }),
            };
          } else {
            obj[c._id] = c._cap || item.item._cap;
          }
        });
      }
    });
  } catch (e) {
    // console.log(e);
  }
  return obj;
};

const isObj = (object) => {
  return object && typeof (object) === 'object' && Object.prototype.toString.call(object).toLowerCase() === '[object object]';
};

const isArray = (object) => {
  return object && typeof (object) === 'object' && object.constructor === Array;
};

const compare = (objA, objB) => {
  if (!isObj(objA) || !isObj(objB)) {
    return false;
  }
  return compareObj(objA, objB, true);
};

const compareObj = (objA, objB, flag) => {
  for (let key in objA) {
    if ({}.hasOwnProperty.call(objA, key)) {
      if (!flag) {
        break;
      }
      if (!objB[key]) {
        flag = false;
        break;
      }
      if (!isArray(objA[key])) {
        if (objB[key] !== objA[key]) {
          flag = false;
          break;
        }
      } else {
        if (!isArray(objB[key])) {
          flag = false;
          break;
        }
        let oA = objA[key];
        let oB = objB[key];
        if (oA.length !== oB.length) {
          flag = false;
          break;
        }
        for (let k in oA) {
          if ({}.hasOwnProperty.call(oA, key)) {
            if (!flag) {
              break;
            }
            flag = compareObj(oA[k], oB[k], flag);
          }
        }
      }
    }
  }
  return flag;
};

const compareTime = (time, addDay) => {
  let addTime = addDay * 86400000;
  let tA = new Date().getTime();
  let tB = new Date(time.replace(/-/g, '/')).getTime();
  return tA > parseInt(tB - addTime, 10);
};

const swapItems = (arr, index1, index2) => {
  let item = arr[index2];
  arr[index2] = arr[index1];
  arr[index1] = item;
  return arr;
};

const minzuOption = [
  {zhi: 1, zhongwen: '汉'},
  {zhi: 2, zhongwen: '蒙'},
  {zhi: 3, zhongwen: '回'},
];

const hunyinOption = [
  {zhi: 1, zhongwen: '未婚'},
  {zhi: 2, zhongwen: '已婚'},
];

const wenhuaOption = [
  {zhi: 1, zhongwen: '小学'},
  {zhi: 2, zhongwen: '初中'},
  {zhi: 3, zhongwen: '高中'},
  {zhi: 4, zhongwen: '大专'},
  {zhi: 5, zhongwen: '大学'},
];

const manyiduOption = [
  {zhi: 1, zhongwen: '很满意'},
  {zhi: 2, zhongwen: '满意'},
  {zhi: 3, zhongwen: '一般'},
  {zhi: 4, zhongwen: '不满意'},
  {zhi: 5, zhongwen: '很不满意'},
];

const getOption = (zhi, options) => {
  const filterOptions = options.filter((item) => {
    return item.zhi === zhi;
  });
  if (filterOptions && filterOptions.length > 0) {
    return filterOptions[0].zhongwen;
  }
};

const chuangweiJoin = (chuangweiList) => {
  const louhao = chuangweiList.length > 0 && chuangweiList[0].louhao;
  const louceng = chuangweiList.length > 0 && chuangweiList[0].louceng;
  const fanghao = chuangweiList.length > 0 && chuangweiList[0].fanghao;
  const chuanghao = chuangweiList.length > 0 && chuangweiList[0].chuanghao;
  const initChuangwei = louhao ? chuangweiList.length > 1 ? `${louhao}楼${louceng}层${fanghao}房` : `${louhao}楼${louceng}层${fanghao}房${chuanghao}床` : '';
  return initChuangwei;
  // return chuangweiList.map((item) => {
  //   return `${item.louhao}楼${item.louceng}层${item.fanghao}房${item.chuanghao}床`;
  // }).join(',');
};

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(routePath => routePath.indexOf(path) === 0 && routePath !== path);
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

const getBedStatus = (state) => {
  switch (state) {
    case 0:
      return '离床';
    case 1:
      return '在床';
    case 2:
      return '无信号';
    case 9:
      return '离线';
    default:
      return '-';
  }
};

const getBeforeDay = () => {
  let date = new Date();
  let before = date - (1000 * 60 * 60 * 24);
  let beforeDate = new Date(before);
  let result = beforeDate;
  return result;
};

const getWeekAgo = () => { // 这个方法是往前推6天的，不要混用
  let date = new Date();
  let before = date - (6 * 1000 * 60 * 60 * 24);
  let beforeDate = new Date(before);
  let result = beforeDate;
  return result;
};

export {
  config,
  request,
  // color,
  classnames,
  mapper,
  queryURL,
  queryArray,
  arrayToTree,
  FORM,
  stringToNumber,
  numberToString,
  filterMenu,
  getMenuPath,
  getMenuByCode,
  createTime,
  typeNameToValue,
  hashPath,
  AppError,
  rsa,
  upload,
  getCap,
  compare,
  compareTime,
  convert,
  minzuOption,
  hunyinOption,
  wenhuaOption,
  manyiduOption,
  getOption,
  swapItems,
  getRoutes,
  chuangweiJoin,
  getBedStatus,
  getBeforeDay,
  getWeekAgo,
};
