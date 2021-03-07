import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_ROOM_BOOKING,
  GET_ROOM_BOOKING_SUCCESS,
  GET_ROOM_BOOKING_FAIL,
  SET_BOOKING,
  SET_BOOKING_SUCCESS,
  SET_BOOKING_FAIL,
  GET_BOOKING_FAIL,
  GET_BOOKING,
  GET_BOOKING_SUCCESS,
} from '../constants';

const apiUrl = 'http://localhost:3001';

function* getRoomBookingSaga(action){
  try {
    const {idRoom, idHotel } = action.payload;
    const responseRoom = yield axios.get(`${apiUrl}/rooms?id=${idRoom}`);
    const responseHotel = yield axios.get(`${apiUrl}/hotel?id=${idHotel}`);
    const dataHotel = responseHotel.data
    const dataRoom = responseRoom.data;
    const data = [...dataHotel,...dataRoom]
    yield put({
      type: GET_ROOM_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_ROOM_BOOKING_FAIL,
      payload: error,
    });
  }
}
function* setBookingSaga(action){
  const {userId, hotelId, roomId} = action.payload;
  try {
    const checkAll = yield axios({
      method: "GET",
      url: `${apiUrl}/booking`,
      params: {
        userId: userId,
        hotelId: hotelId,
        roomId: roomId,
        status: false,
      },
    });
    const code= `ARYA2021${userId}${hotelId}${roomId}${Math.floor(Math.random() * 10)}`;
    const dataStatusFalse = checkAll.data;
    if(dataStatusFalse.length === 0){
      const response= yield axios.post(`${apiUrl}/booking`, {...action.payload, code});
      const data = response.data
      yield put({
        type: SET_BOOKING_SUCCESS,
        payload: data,
      });
    }
    else{
    const CheckAllId = dataStatusFalse[0].id

      const response= yield axios.put(`${apiUrl}/booking/${CheckAllId}`, {...action.payload, code});
      
      const data = response.data
      yield put({
        type: SET_BOOKING_SUCCESS,
        payload: data,
      });
    }

 
  } catch (error) {
    yield put({
      type: SET_BOOKING_FAIL,
      payload: error,
    });
  }
}
function* getBookingSaga(action){
  const {userId} = action.payload;
  try {
    const response = yield axios({
      method: "GET",
      url: `${apiUrl}/booking`,
      params: {
        userId: userId,
      },
    });

      const data = response.data
      yield put({
        type: GET_BOOKING_SUCCESS,
        payload: data,
      });

  } catch (error) {
    yield put({
      type: GET_BOOKING_FAIL,
      payload: error,
    });
  }
}



export default function* bookingSaga(){
  yield takeEvery(GET_ROOM_BOOKING, getRoomBookingSaga);
  yield takeEvery(SET_BOOKING, setBookingSaga);
  yield takeEvery(GET_BOOKING, getBookingSaga);
 
}
