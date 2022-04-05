import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

const selectUser = createSelector(
  [selectUserReducer],
  (currentUserSlice) => currentUserSlice.currentUser
);

export const selectCurrentUser = createSelector(
  [selectUser],
  (currentUser) => currentUser
);
