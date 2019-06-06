import { cardActions } from '../types';

const initialState = [];


function cardReducer(state = initialState, action) {
  switch (action.type) {
    case cardActions.ADD_CARD_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default cardReducer;
