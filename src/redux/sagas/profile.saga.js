import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from "../constants";

function* editProfileSaga(action) {
  try {
    const { id, firstName, lastName, phone, password } = action.payload;

    const response = yield axios.patch(
      `http://localhost:3001/userAccount/${id}`,
      {
        firstName,
       lastName,
        phone,
         password,
      }
    );
    const data = response.data;

    yield put({
      type: EDIT_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: EDIT_PROFILE_FAIL,
      payload: error,
    });
  }
}
export default function* hotelSaga() {
  yield takeEvery(EDIT_PROFILE, editProfileSaga);
}
