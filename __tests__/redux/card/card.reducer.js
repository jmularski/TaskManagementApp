import cardReducer from '../../../src/reducers/cardReducer';
import { cardActions } from '../../../src/types';

const cardData = { 
  token: 'test', 
  number: '1234123412341234', 
  expiration: {
    month: '02',
    year: '30',
  },
  cvc: '123',
};
describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(cardReducer(undefined, {})).toEqual([]);
  });
  it('should handle ADD_CARD_SUCCESS', () => {
    expect(
      cardReducer([], {
        type: cardActions.ADD_CARD_SUCCESS,
        payload: cardData
      })
    ).toEqual([
      cardData,
    ]);
  });
});