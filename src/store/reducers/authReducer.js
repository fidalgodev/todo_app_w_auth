import * as actions from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.AUTH_START:
      return { ...state, loading: true };

    case actions.AUTH_END:
      return { ...state, loading: false };

    case actions.AUTH_FAIL:
      return { ...state, error: payload };

    case actions.AUTH_SUCCESS:
      return { ...state, error: false };

    case actions.CLEAN_UP:
      return { ...state, error: null, loading: false };

    default:
      return state;
  }
};
