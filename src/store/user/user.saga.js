import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signAuthUserOut,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  userNotFoundInSession,
} from "./user.action";
import USER_ACTION_TYPES from "./user.types";

function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (userAuth) {
      yield call(getSnapshotFromUserAuth, userAuth);
    } else {
      yield put(userNotFoundInSession());
    }
  } catch (error) {}
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
    switch (error.code) {
      case "auth/popup-closed-by-user":
        alert("Google authentication failed. Try again");
        break;

      default:
        console.log(error);
        break;
    }
  }
}

function* onSignInWithGoogle() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail(action) {
  const { email, password } = action.payload;
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    console.log(user);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        alert(
          "User not found. Please retry or sign up if you don't have an account"
        );
        break;
      case "auth/wrong-password":
        alert("Password entered is invalid. Please retry with right password");
        break;
      default:
        console.log(error);
        break;
    }
  }
}

function* onSignInWithEmail() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* signUp(action) {
  const { email, password, displayName } = action.payload;
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user, { displayName });
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email already in use. Please use a different Email Id");
    } else if (error.code === "auth/weak-password") {
      alert("Password should be atleast 6 characters");
    }
    console.log("user creation encountered an error", error);
  }
}

function* onSignUp() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* signOut() {
  yield call(signAuthUserOut);
}

function* onSignOut() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onSignInWithGoogle),
    call(onSignOut),
    call(onSignInWithEmail),
    call(onSignUp),
  ]);
}
