import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from "./categories.types";

const selectCategoriesReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice): CategoryMap =>
    categoriesSlice.categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (isLoadingSlice) => isLoadingSlice.isLoading
);

export const selectCategoriesError = createSelector(
  [selectCategoriesReducer],
  (errorSlice) => errorSlice.error
);
