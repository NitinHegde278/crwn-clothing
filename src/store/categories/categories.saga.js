import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFail,
  fetchCategoriesSuccess,
} from "./categories.action";
import CATEGORIES_ACTION_TYPE from "./categories.types";

function* fetchCategoriesAsync() {
  try {
    const categoryArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoryArray));
  } catch (error) {
    yield put(fetchCategoriesFail(error));
  }
}

function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
