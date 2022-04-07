import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (currentUserSlice) => currentUserSlice.currentUser
);

export const selectUserIsLoading = createSelector(
  [selectUserReducer],
  (isLoadingSlice) => isLoadingSlice.isLoading
);
