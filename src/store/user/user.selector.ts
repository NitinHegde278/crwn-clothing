import { createSelector } from "reselect";
import { RootState } from "../store";

const selectUserReducer = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (currentUserSlice) => currentUserSlice.currentUser
);

export const selectUserIsLoading = createSelector(
  [selectUserReducer],
  (isLoadingSlice) => isLoadingSlice.isLoading
);
