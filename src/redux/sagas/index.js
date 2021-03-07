import { fork } from 'redux-saga/effects';

import hotelSaga from './hotel.saga';
import userAccountSaga from './auth.saga';
import bookingSaga from './booking.saga';
import editProfileSaga from "./profile.saga"
import paymentSuccessSaga from "./payment.saga"


export default function* mySaga() {
  yield fork(hotelSaga);
  yield fork(userAccountSaga);
  yield fork(bookingSaga);
  yield fork(editProfileSaga);
  yield fork(paymentSuccessSaga);

  

  
}
