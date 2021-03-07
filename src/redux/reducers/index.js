import { combineReducers } from 'redux';
import hotelReducer from './hotel.reducer';
import authReducer from "./auth.reducer";
import bookingReducer from "./booking.reducer";
import editProfileReducer from "./profile.reducer";
import paymentReducer from "./payment.reducer";

export default combineReducers({
  hotelReducer,
  authReducer,
  bookingReducer,
  editProfileReducer,
  paymentReducer
});
