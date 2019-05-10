import * as actions from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  deleteTodo: {
    error: null,
    loading: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_TODO_START:
      return { ...state, loading: true };

    case actions.ADD_TODO_SUCCESS:
      return { ...state, loading: false, error: false };

    case actions.ADD_TODO_FAIL:
      return { ...state, loading: false, error: payload };

    case actions.DELETE_TODO_START:
      return { ...state, deleteTodo: { ...state.deleteTodo, loading: true } };

    case actions.DELETE_TODO_SUCCESS:
      return {
        ...state,
        deleteTodo: { ...state.deleteTodo, loading: false, error: false },
      };

    case actions.DELETE_TODO_FAIL:
      return {
        ...state,
        deleteTodo: { ...state.deleteTodo, loading: false, error: payload },
      };

    default:
      return state;
  }
};
