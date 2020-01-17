import { MODAL_ACTION_TYPES } from 'store/actions/modal.actions';

const initialState = {
  Node: null,
  isShow: false,
  options: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MODAL_ACTION_TYPES.MODAL_SHOW_MODAL:
      return {
        ...state,
        isShow: true,
        Node: action.payload.Node,
        options: action.payload.options,
      };
    case MODAL_ACTION_TYPES.MODAL_HIDE_MODAL:
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};
