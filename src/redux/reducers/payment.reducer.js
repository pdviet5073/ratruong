import {
  SET_PAYMENT_SUCCESS,
} from "../constants";

const initialState = {

  payment: {},
};
// {...action.payload, code: `ARYA2021${userId}0${hotelId}0${roomId}`}
export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
 
    case SET_PAYMENT_SUCCESS: {
      return {
        ...state,
        payment: {
          ...action.payload,
        },
      };
    }
 

    default: {
      return state;
    }
  }
}
