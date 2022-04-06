import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) =>
    categoriesSlice.categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (isLoadingSlice) => isLoadingSlice.isLoading
);

export const selectCategoriesError = createSelector(
  [selectCategoriesReducer],
  (errorSlice) => errorSlice.error
);
