import {combineReducers} from 'redux'

const INITIAL_STATE = { 
  isSignedIn: null,
  userId: null,
  stats: {},
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedIn: true, userId: action.payload.userId, stats: action.payload.stats};
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default combineReducers({
    auth:authReducer
})
