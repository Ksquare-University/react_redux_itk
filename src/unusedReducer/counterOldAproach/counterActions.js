import types from './counterTypes';

function incrementAction() {
  return {
    type: types.increment,
  };
}

function decrementAction() {
  return {
    type: types.decrement,
  };
}

function incrementByAmountAction(amount) {
  return {
    type: types.incrementByAmount,
    payload: amount,
  };
}

export default {
  incrementAction,
  decrementAction,
  incrementByAmountAction,
};
