import types from './counterTypes';
// Kept for reference, prefer redux toolkit approach

const initialState = {
  value: 0,
  status: 'idle',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.increment:
      return {
        ...state,
        value: state.value + 1,
      };

    case types.decrement:
      return {
        ...state,
        value: state.value - 1,
      };
      
    case types.incrementByAmount:
      return {
        ...state,
        value: state.value + action.payload,
      };
        
    default:
      return state;
  }
}
