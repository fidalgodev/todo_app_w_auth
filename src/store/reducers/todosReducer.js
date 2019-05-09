import * as actions from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_TODO_START:
      return { ...state, loading: true };

    case actions.ADD_TODO_SUCCESS:
      return { ...state, loading: false, error: false };

    case actions.ADD_TODO_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
