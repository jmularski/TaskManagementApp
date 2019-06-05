import { cardActions } from '../types';

const initialState = {
  cardData: {
    cards: []
  }
};


function cardReducer(state = initialState, action) {
  switch(action.type) {
    case cardActions.ADD_CARD_SUCCESS:
      return {
        ...state,
        cardData: {
          cards: [...state.cards, action.payload]
        }
      }
    default:
      return state;  
  }
}

export default cardReducer;