const Mock = require('mockjs');
const common = require('./common');

const {
  config: {
    apiPrefix,
  },
} = common;

const list = Mock.mock({
  'dataList|100': [{
    name: '@cfirst @clast',
    id: '@id',
    nickName: '@cfirst @clast',
    shouji: '@integer(13100000000, 18999999999)',
    email: '131313@2E.com',
    userSign: '@cfirst @clast',
    department: '销售',
    context: '@sentence',
    status () {
      let rand = Mock.Random.integer(0, 9);
      return rand > 5 ? 1 : 0;
    },
    verifyStatus () {
      let rand = Mock.Random.integer(0, 9);
      return rand > 5 ? 1 : 2;
    },
    avatar () {
      return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', Mock.Random.name());
    },
    regTime () {
      return Mock.Random.date();
    },
    bonus: '@integer(0, 300)'
  }],
});

let database = list.dataList;

module.exports = {
  [`POST ${apiPrefix}/v1/user/query`] (req, res) {
    let {
      pageSize,
      pageNum,
      ...other
    } = req.body;
    pageSize = pageSize || 10;
    pageNum = pageNum || 1;

    let newData = database;

    res.status(200).json({
      rc: 0,
      list: newData.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      currentPage: parseInt(pageNum, 10),
      totalPage: newData.length / pageSize + newData.length % pageSize != 0 ? 1 : 0,
      totalNum: newData.length,
      pageSize,
    });
  },
  [`POST ${apiPrefix}/v1/user/modify`] (req, res) {
    let {
      pageSize,
      pageNum,
      ...other
    } = req.body;
    pageSize = pageSize || 10;
    pageNum = pageNum || 1;

    let newData = database;

    res.status(200).json({
      rc: 0,
      list: newData.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      currentPage: parseInt(pageNum, 10),
      totalPage: newData.length / pageSize + newData.length % pageSize != 0 ? 1 : 0,
      totalNum: newData.length,
      pageSize,
    });
  },
};
