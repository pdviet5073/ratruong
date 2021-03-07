import {

  SET_PAYMENT
} from '../constants';


export function setPayment(params) {
  return {
    type: SET_PAYMENT,
    payload: params,
  }
}