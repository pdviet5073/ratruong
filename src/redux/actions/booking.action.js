import {
  GET_BOOKING,
  SET_BOOKING,
  GET_ROOM_BOOKING,
} from '../constants';

export function getRoomBooking(params) {
  return {
    type: GET_ROOM_BOOKING,
    payload: params,
  }
}

export function setBooking(params) {
  return {
    type: SET_BOOKING,
    payload: params,
  }
}

export function getBooking(params) {
  return {
    type: GET_BOOKING,
    payload: params,
  }
}
