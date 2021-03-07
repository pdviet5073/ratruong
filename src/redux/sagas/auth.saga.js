import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CREATE_USER_ACCOUNT,
  CREATE_USER_ACCOUNT_FAIL,
  CREATE_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT,
  GET_USER_ACCOUNT_FAIL,
  GET_USER_ACCOUNT_SUCCESS,
} from "../constants";

const apiUrl = "http://localhost:3001";

function* createUserAccountSaga(action) {
  try {
    const {email} = action.payload;
    const responseCheck = yield axios.get(`${apiUrl}/userAccount?email=${email}`);
    const dataCheck = responseCheck.data;
    if(dataCheck.length>0){
      toast('🤔 Tên tài khoản đã tồn tại', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
   
      yield put({
        type: CREATE_USER_ACCOUNT_FAIL,
       
      });

    }else{
      const response = yield axios.post(`${apiUrl}/userAccount`, action.payload);
    const data = response.data;
    let user = JSON.stringify(data);
    localStorage.setItem("user", user);
    yield put({
      type: CREATE_USER_ACCOUNT_SUCCESS,
      payload: data,
    });
  }
  } catch (error) {
    yield put({
      type: CREATE_USER_ACCOUNT_FAIL,
      payload: error,
    });
  }
}
function* getUserAccountSaga(action) {
  const { email, password } = action.payload;
  const response = yield axios.get(`${apiUrl}/userAccount?email=${email}&password=${password}`);
  const data = response.data;
  if (data.length>0) {
    let user = JSON.stringify(data[0]);
    localStorage.setItem("user", user);
    yield put({
      type: GET_USER_ACCOUNT_SUCCESS,
      payload: data[0],
    });
  } else {
    toast('🙂 Tài khoản hoặc mật khẩu chưa đúng', {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    yield put({
      type: GET_USER_ACCOUNT_FAIL
    });
   
  }
}

export default function* userAccountSaga() {
  yield takeEvery(CREATE_USER_ACCOUNT, createUserAccountSaga);
  yield takeEvery(GET_USER_ACCOUNT, getUserAccountSaga);
}
