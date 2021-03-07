import {
  CREATE_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_SUCCESS,

} from '../constants';

const initialState = {
  createAccount: [],
  getAccount:{}
};

export default function authReducer(state = initialState, action) {
 
  switch (action.type) {
    case CREATE_USER_ACCOUNT_SUCCESS: {
     
      return {
        ...state,
        createAccount: [
          action.payload,
        ],
      }
    }
    case GET_USER_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: {
          ...action.payload,
        }
      }
    }
    default: {
      return state;
    }
    
  }
}
