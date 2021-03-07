import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  GET_HOTEL_LIST,
  GET_HOTEL_LIST_SUCCESS,
  GET_HOTEL_LIST_FAIL,
  GET_SEARCH_HOTEL_LIST,
  GET_SEARCH_HOTEL_LIST_SUCCESS,
  GET_SEARCH_HOTEL_LIST_FAIL,
  GET_HOTEL_DETAIL,
  GET_HOTEL_DETAIL_SUCCESS,
  GET_HOTEL_DETAIL_FAIL,
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  GET_RANDOM_HOTEL,
  GET_RANDOM_HOTEL_SUCCESS,
  GET_RANDOM_HOTEL_FAIL,
} from "../constants";

const apiUrl = 'http://localhost:3001';


function* getHotelListSaga(action) {
  try {
    const { page, limit, place } = action.payload;
    const response = yield axios({
      method: "GET",
      url: "http://localhost:3001/hotel",
      params: {
        place: place,
        ...(page && { _page: page }),
        ...(limit && { _limit: limit }),
      },
    });
    const responseAllHotel = yield axios({
      method: "GET",
      url: "http://localhost:3001/hotel",
      params: {
        place: place,
      },
    });
    const data = [...response.data,...responseAllHotel.data];
    console.log('Console.log:  > function*getHotelListSaga > response.data', response.data);
    yield put({
      type: GET_HOTEL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_HOTEL_LIST_FAIL,
      payload: error,
    });
  }
}

function* getSearchHotelSaga(action) {
  try {
    const { rate, sort, rangePrice, page, place } = action.payload;
    const response = yield axios({
      method: "GET",
      url: "http://localhost:3001/hotel",
      params: {
        place: place,
        _page: page,
        _limit: 10,
        rate: rate,
        ...(sort &&
          (sort == "point"
            ? { _sort: `point`, _order: "desc" }
            : { _sort: `defaultPrice`, _order: sort })),
        ...(rangePrice && {
          defaultPrice_gte: rangePrice[0],
          defaultPrice_lte: rangePrice[1],
        }),
      },
    });
    const data = response.data;
    yield put({
      type: GET_SEARCH_HOTEL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_SEARCH_HOTEL_LIST_FAIL,
      payload: error,
    });
  }
}

function* getHotelDetailSaga(action) {
  try {
    const { id } = action.payload;
    const responseHotel = yield axios({
      method: "GET",
      url: `http://localhost:3001/hotel?id=${id}`,
    });
    const responseRoom = yield axios({
      method: "GET",
      url: `http://localhost:3001/rooms?hotelId=${id}`,
    });

    const responseComment = yield axios({
      method: "GET",
      url: `http://localhost:3001/comments?hotelId=${id}`,
    });
    const dataHotels = responseHotel.data;
    const dataComments = responseComment.data;
    const dataRooms = responseRoom.data;
    const data = [...dataHotels, dataComments, ...dataRooms];

    yield put({
      type: GET_HOTEL_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_HOTEL_DETAIL_FAIL,
      payload: error,
    });
  }
}

function* createCommentSaga(action) {
  try {
    const response = yield axios.post(
      `http://localhost:3001/comments`,
      action.payload
    );
    const data = response.data;
    yield put({
      type: CREATE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CREATE_COMMENT_FAIL,
      payload: error,
    });
  }
}

function* getCommentSaga(action) {
  try {
    const { id, page, limit } = action.payload;
    const response = yield axios({
      method: "GET",
      url: `http://localhost:3001/comments`,
      params: {
        hotelId: id,
        _page: page,
        _limit: limit,
        _sort: "id",
        _order: "desc",
      },
    });
    const data = response.data;
    yield put({
      type: GET_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_COMMENT_FAIL,
      payload: error,
    });
  }
}
function* getRandomHotelSaga(action) {
  try {
    const { place } = action.payload;
    const response = yield axios({
      method: "GET",
      url: `${apiUrl}/hotel`,
      params: {
        place: place,
      },
    });
    const data = response.data;
    if (data.length > 0) {
      const Rand = data[Math.floor(Math.random() * data.length)];
      let Rand1;
      let Rand2;
      do {
        Rand1 = data[Math.floor(Math.random() * data.length)];
        Rand2 = data[Math.floor(Math.random() * data.length)];
      } while (
        JSON.stringify(Rand1) === JSON.stringify(Rand) ||
        JSON.stringify(Rand) === JSON.stringify(Rand2) ||
        JSON.stringify(Rand1) === JSON.stringify(Rand2)
      );
      const dataRandom = [Rand, Rand1, Rand2];
      yield put({
        type: GET_RANDOM_HOTEL_SUCCESS,
        payload: dataRandom,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RANDOM_HOTEL_FAIL,
      payload: error,
    });
  }
}
export default function* hotelSaga() {
  yield takeEvery(GET_HOTEL_LIST, getHotelListSaga);
  yield takeEvery(GET_SEARCH_HOTEL_LIST, getSearchHotelSaga);
  yield takeEvery(GET_HOTEL_DETAIL, getHotelDetailSaga);
  yield takeEvery(CREATE_COMMENT, createCommentSaga);
  yield takeEvery(GET_COMMENT, getCommentSaga);
  yield takeEvery(GET_RANDOM_HOTEL, getRandomHotelSaga);
}
