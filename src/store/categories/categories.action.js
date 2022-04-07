import { createAction } from "../../utils/reducer/reducer.utils";
import CATEGORIES_ACTION_TYPE from "./categories.types";

export const fetchCategoriesStart = () => {
  return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);
};

export const fetchCategoriesSuccess = (categoryArray) => {
  return createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoryArray
  );
};

export const fetchCategoriesFail = (error) => {
  return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAIL, error);
};
