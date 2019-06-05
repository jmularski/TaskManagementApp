import {
  put, call, takeEvery, all,
} from 'redux-saga/effects';
import { cardActions } from '../types';

function* addCard({ payload }) {

};

function recryptCard({ payload }) {

};

function addCardSuccess({ payload }) {

};

function addCardFailure({ payload }) {

};

export default function* cardSaga() {
  yield all([
    takeEvery(cardActions.ADD_CARD, addCard),
    takeEvery(cardActions.RECRYPT_CARD, recryptCard),
    takeEvery(cardActions.ADD_CARD_SUCCESS, addCardSuccess),
    takeEvery(cardActions.ADD_CARD_FAILURE, addCardFailure),
  ]);
};