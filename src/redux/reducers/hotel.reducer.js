import {
  GET_HOTEL_LIST_SUCCESS,
  GET_HOTEL_LIST_FAIL,
  GET_SEARCH_HOTEL_LIST_SUCCESS,
  GET_SEARCH_HOTEL_LIST_FAIL,
  GET_HOTEL_DETAIL_SUCCESS,
  GET_HOTEL_DETAIL_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  GET_RANDOM_HOTEL_SUCCESS,
  GET_RANDOM_HOTEL_FAIL
} from '../constants';

const initialState = {
  hotelList: [],
  searchHotelList:[],
  hotelDetail: [],
  commentList:[],
  randomHotel: []
};

export default function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_LIST_SUCCESS: {
      return {
        ...state,
        hotelList: [
          ...action.payload,
        ],
      }
    }
    case GET_HOTEL_LIST_FAIL: {
      return state;
    }
  
    case GET_SEARCH_HOTEL_LIST_SUCCESS: {
      return {
        ...state,
        searchHotelList: [
          ...action.payload,
        ],
      }
    }
    case GET_SEARCH_HOTEL_LIST_FAIL: {
      return state;
    }

    case GET_HOTEL_DETAIL_SUCCESS: {
      return {
        ...state,
        hotelDetail: [
          ...action.payload,
        ],
      }
    }
    case GET_HOTEL_DETAIL_FAIL: {
      return state;
    }
    
    case CREATE_COMMENT_SUCCESS: {
      return {
        ...state,
        commentList: [
          action.payload,
          ...state.commentList,
          
        ],
      }
    }
    case CREATE_COMMENT_FAIL: {
      return state;
    }
    
    case GET_COMMENT_SUCCESS: {
      return {
        ...state,
        commentList: [
          ...action.payload,
        ],
      }
    }
    case GET_COMMENT_FAIL: {
      return state;
    }
    case   GET_RANDOM_HOTEL_SUCCESS:
     {
      return {
        ...state,
        randomHotel: [
          ...action.payload,
        ],
      }
    }
    case GET_RANDOM_HOTEL_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
}
