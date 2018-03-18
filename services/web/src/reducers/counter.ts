import { Action } from 'redux';

const defaultState = {
  count: 0,
};

export default (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'COUNTER_INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };

    case 'COUNTER_DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};
