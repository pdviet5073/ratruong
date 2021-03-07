import { EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL } from "../constants";

const initialState = {
  userDataEdited: {},
};

export default function editProfileReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        userDataEdited: {
          ...action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
}
