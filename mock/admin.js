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
    mobile: '@integer(13100000000, 18999999999)',
    email: '131313@2E.com',
    department: '销售',
    context: '@sentence',
    status () {
      let rand = Mock.Random.integer(0, 9);
      return rand > 5 ? 1 : 0;
    },
    avatarUrl () {
      return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', Mock.Random.name());
    },
    createTime () {
      return Mock.Random.date();
    },
    permission() {
      return ['0002', '0003'];
    },
    id: '@id',
  }],
});

let database = list.dataList;

module.exports = {
  [`POST ${apiPrefix}/v1/manager/query`] (req, res) {
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

  [`POST ${apiPrefix}/v1/manager/add`] (req, res) {
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

  [`POST ${apiPrefix}/v1/backend/manager/modify`] (req, res) {
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

  [`POST ${apiPrefix}/v1/manager/reset_other_mima`] (req, res) {
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
