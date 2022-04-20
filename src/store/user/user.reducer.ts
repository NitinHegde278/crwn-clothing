import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutStart,
  signUpStart,
  userNotFoundInSession,
} from "./user.action";

type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  }
  if (signInFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }
  if (signOutStart.match(action)) {
    return {
      ...state,
      isLoading: false,
      currentUser: null,
    };
  }
  if (userNotFoundInSession.match(action)) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (
    checkUserSession.match(action) ||
    googleSignInStart.match(action) ||
    emailSignInStart.match(action) ||
    signUpStart.match(action)
  ) {
    return {
      ...state,
      isLoading: true,
    };
  }
  return state;
};
