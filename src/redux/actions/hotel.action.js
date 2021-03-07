import {
  GET_HOTEL_LIST,
  GET_SEARCH_HOTEL_LIST,
  GET_HOTEL_DETAIL,
  CREATE_COMMENT,
  GET_COMMENT,
  GET_RANDOM_HOTEL
} from '../constants';

export function getHotelList(params) {
  return {
    type: GET_HOTEL_LIST,
    payload: params,
  }
  
}
export function getSearchHotelList(params) {
  return {
    type: GET_SEARCH_HOTEL_LIST,
    payload: params,
  }
}
export function getHotelDetail(params) {
  return {
    type: GET_HOTEL_DETAIL,
    payload: params,
  }
}
export function createComment(params) {
  return {
    type: CREATE_COMMENT,
    payload: params,
  }
}
export function getCommentList(params) {
  return {
    type: GET_COMMENT,
    payload: params,
  }
}
export function getRandomHotel(params) {
  return {
    type: GET_RANDOM_HOTEL,
    payload: params,
  }
}


