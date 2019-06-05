import { cardActions } from '../types';

export const addCard = cardData => ({
  type: cardActions.ADD_CARD,
  payload: cardData,
});

export const recryptCard = cardData => ({
  type: cardActions.RECRYPT_CARD,
  payload: cardData,
});

export const addCardSuccess = cardData => ({
  type: cardActions.ADD_CARD_SUCCESS,
  payload: cardData,
});

export const addCardFailure = payload => ({
  type: cardActions.ADD_CARD_FAILURE,
  payload,
});