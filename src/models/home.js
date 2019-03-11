import modelExtend from 'dva-model-extend';
import { config } from 'utils';
import { pageSizeModel } from './common';

const { prefix } = config;

export default modelExtend(pageSizeModel, {
  namespace: 'home',
  state: {
    viewModalVisible: false,
    modalVisible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {});
    },
  },
  effects: {},
  reducers: {
    showModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    hideModal(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
    showViewModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        viewModalVisible: true,
      };
    },
    hideViewModal(state) {
      return {
        ...state,
        viewModalVisible: false,
      };
    },
  },
});
