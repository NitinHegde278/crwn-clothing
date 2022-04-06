import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import CATEGORIES_ACTION_TYPE from "./categories.types";

const fetchCategoriesStart = () => {
  return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);
};

const fetchCategoriesSuccess = (categoryArray) => {
  return createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoryArray
  );
};

const fetchCategoriesFail = (error) => {
  return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAIL, error);
};

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoryArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoryArray));
  } catch (error) {
    dispatch(fetchCategoriesFail(error));
  }
};
