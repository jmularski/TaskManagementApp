import { addCard, recryptCard, addCardSuccess, addCardFailure } from '../../../src/actions/cardActions';
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
const payload = "Error when adding card";
describe('Card actions', () => {
  it('should create an addCard action', () => {
    const expectedActions = {
      type: cardActions.ADD_CARD,
      payload: cardData,
    };

    expect(addCard(cardData)).toEqual(expectedActions);
  });
  it('should create an recryptCard action', () => {
    const expectedActions = {
      type: cardActions.RECRYPT_CARD,
      payload: cardData,
    };

    expect(recryptCard(cardData)).toEqual(expectedActions);
  });
  it('should create an addCardSuccess action', () => {
    const expectedActions = {
      type: cardActions.ADD_CARD_SUCCESS,
      payload: cardData,
    };

    expect(addCardSuccess(cardData)).toEqual(expectedActions);
  });
  it('should create an addCardFailure action', () => {
    const expectedActions = {
      type: cardActions.ADD_CARD_FAILURE,
      payload,
    };

    expect(addCardFailure(payload)).toEqual(expectedActions);
  });
});