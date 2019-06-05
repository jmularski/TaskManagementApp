import { cardActions } from '../types';

export const addCard = cardData => ({
  type: cardActions.ADD_CARD,
  payload: cardData,
});

export const recryptCard = cardData => ({
  type: cardActions.RECRYPT_CARD,
  payload: cardData,
});