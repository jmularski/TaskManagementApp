import {
  put, call, takeEvery, all,
} from 'redux-saga/effects';
import { cardActions } from '../types';
import { setToMainDrawer } from '../actions/navActions';
import CardService from '../services/card.service';
import { addCardSuccess, addCardFailure } from '../actions/cardActions';
import Toast from '../utils/Toast';

function* addCard({ payload }) {
  try {
    const response = yield call(CardService.addCard, payload);
    if (response.status === 200) {
      yield put(addCardSuccess(payload));
    } else {
      yield put(addCardFailure(response.data));
    }
  } catch (e) {
    yield put(addCardFailure('Error when adding card.'));
  }
}

function* recryptCard({ payload }) {

}

function* handleAddCardSuccess({ payload }) {
  yield put(setToMainDrawer());
  yield call(Toast, payload.message);
}

function* handleAddCardFailure({ payload }) {
  yield call(Toast, payload);
}

export default function* cardSaga() {
  yield all([
    takeEvery(cardActions.ADD_CARD, addCard),
    takeEvery(cardActions.RECRYPT_CARD, recryptCard),
    takeEvery(cardActions.ADD_CARD_SUCCESS, handleAddCardSuccess),
    takeEvery(cardActions.ADD_CARD_FAILURE, handleAddCardFailure),
  ]);
}
