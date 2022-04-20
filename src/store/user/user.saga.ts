import { AuthError, AuthErrorCodes, User } from "firebase/auth";
import { all, call, takeLatest, put } from "typed-redux-saga/macro";
import {
  AdditionalInfo,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signAuthUserOut,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import {
  EmailSignInStart,
  signInFailed,
  signInSuccess,
  SignUpStart,
  userNotFoundInSession,
} from "./user.action";
import USER_ACTION_TYPES from "./user.types";

function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalInfo?: AdditionalInfo
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (userAuth) {
      yield* call(getSnapshotFromUserAuth, userAuth);
    } else {
      yield* put(userNotFoundInSession());
    }
  } catch (error) {}
}

function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
    switch ((error as AuthError).code) {
      case AuthErrorCodes.POPUP_CLOSED_BY_USER:
        alert("Google authentication failed. Try again");
        break;

      default:
        console.log(error);
        break;
    }
  }
}

function* onSignInWithGoogle() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail(action: EmailSignInStart) {
  const { email, password } = action.payload;
  try {
    const userCredentials = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredentials) {
      yield* call(getSnapshotFromUserAuth, userCredentials.user);
    }
  } catch (error) {
    switch ((error as AuthError).code) {
      case AuthErrorCodes.INVALID_EMAIL:
        alert(
          "User not found. Please retry or sign up if you don't have an account"
        );
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
        alert("Password entered is invalid. Please retry with right password");
        break;
      default:
        console.log(error);
        break;
    }
  }
}

function* onSignInWithEmail() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* signUp(action: SignUpStart) {
  const { email, password, displayName } = action.payload;
  try {
    const userCredentials = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredentials) {
      yield* call(getSnapshotFromUserAuth, userCredentials.user, {
        displayName,
      });
    }
  } catch (error) {
    if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
      alert("Email already in use. Please use a different Email Id");
    } else if ((error as AuthError).code === AuthErrorCodes.WEAK_PASSWORD) {
      alert("Password should be atleast 6 characters");
    }
    console.log("user creation encountered an error", error);
  }
}

function* onSignUp() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* signOut() {
  yield* call(signAuthUserOut);
}

function* onSignOut() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onSignInWithGoogle),
    call(onSignOut),
    call(onSignInWithEmail),
    call(onSignUp),
  ]);
}
