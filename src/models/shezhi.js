import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import {pageSizeModel} from './common';

export default modelExtend(pageSizeModel, {
  namespace: 'shezhi',
  state: {
    modalVisible: false,
    viewModalVisible: false,
  },
  subscriptions: {
    setup ({dispatch, history}) {
      history.listen(({pathname}) => {
      });
    },
  },
  effects: {
  },
  reducers: {
    showModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    hideModal (state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
    showViewModal (state, {payload}) {
      return {
        ...state,
        ...payload,
        viewModalVisible: true,
      };
    },
    hideViewModal (state) {
      return {
        ...state,
        viewModalVisible: false,
      };
    },
  },
});
