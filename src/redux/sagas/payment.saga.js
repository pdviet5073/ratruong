import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  SET_PAYMENT,
  SET_PAYMENT_SUCCESS,
  SET_PAYMENT_FAIL,
} from "../constants";

const apiUrl = "http://localhost:3001";

function* paymentSuccessSaga(action) {
  try {
    const { bookRoomId } = action.payload;
    const response = yield axios.patch(`${apiUrl}/booking/${bookRoomId}`, {
      status: true,
    });
    const data = response.data;
    yield put({
      type: SET_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: SET_PAYMENT_FAIL,
      payload: error,
    });
  }
}

export default function* paymentSaga() {
  yield takeEvery(SET_PAYMENT, paymentSuccessSaga);
}
