import {
  GET_ROOM_BOOKING_SUCCESS,
  GET_ROOM_BOOKING_FAIL,
  SET_BOOKING_SUCCESS,
  GET_BOOKING_SUCCESS,
  GET_BOOKING_FAIL,
} from "../constants";

const initialState = {
  roomBookingData: [],
  bookingData: [],
  setBookingData: {},
};
// {...action.payload, code: `ARYA2021${userId}0${hotelId}0${roomId}`}
export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_BOOKING_SUCCESS: {
      return {
        ...state,
        roomBookingData: [...action.payload],
      };
    }
    case SET_BOOKING_SUCCESS: {
      return {
        ...state,
        setBookingData: {
          ...action.payload,
        },
      };
    }
    case GET_BOOKING_SUCCESS: {
      return {
        ...state,
        bookingData: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
}
