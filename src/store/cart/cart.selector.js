import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

const selectCartOpen = createSelector(
  [selectCartReducer],
  (cartOpenSlice) => cartOpenSlice.isCartOpen
);

export const selectIsCartOpen = createSelector(
  [selectCartOpen],
  (isCartOpen) => isCartOpen
);

const selectItems = createSelector(
  [selectCartReducer],
  (cartItemsSlice) => cartItemsSlice.cartItems
);

export const selectCartItems = createSelector(
  [selectItems],
  (cartItems) => cartItems
);

export const selectCartCount = createSelector([selectItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0)
);

export const selectCartTotal = createSelector([selectItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.price;
  }, 0)
);
