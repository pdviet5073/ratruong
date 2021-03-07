import {

  EDIT_PROFILE,

} from '../constants';


export function editProfile(params) {
  return {
    type: EDIT_PROFILE,
    payload: params,
  }
}