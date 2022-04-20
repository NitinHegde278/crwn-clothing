import { AnyAction } from "redux";
import {
  addItemToCart,
  clearCartItems,
  removeItemFromCart,
  removeItemFromCheckout,
  setCartItems,
  setIsCartOpen,
} from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (clearCartItems.match(action)) {
    return {
      ...state,
      cartItems: [],
    };
  }

  return state;
};
