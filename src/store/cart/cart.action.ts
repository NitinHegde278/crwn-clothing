import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/categories.types";
import { CartItem, CART_ACTION_TYPE } from "./cart.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem && existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) => {
      return cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem;
    });
  } else {
    return cartItems;
  }
};

const removeFromCheckout = (
  cartItems: CartItem[],
  checkoutItemToRemove: CartItem
): CartItem[] => {
  return cartItems.filter(
    (cartItem) => cartItem.id !== checkoutItemToRemove.id
  );
};

type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_IS_CART_OPEN,
  boolean
>;

type UpdateCart = ActionWithPayload<CART_ACTION_TYPE.UPDATE_CART, CartItem[]>;

type ClearCartItems = Action<CART_ACTION_TYPE.CLEAR_CART>;

export const setCartItems = withMatcher((cartItems: CartItem[]) =>
  createAction(CART_ACTION_TYPE.UPDATE_CART, cartItems)
);

export const setIsCartOpen = withMatcher(
  (isCartOpen: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, isCartOpen);
  }
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): UpdateCart => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): UpdateCart => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const removeItemFromCheckout = (
  cartItems: CartItem[],
  checkoutItemToRemove: CartItem
): UpdateCart => {
  const newCartItems = removeFromCheckout(cartItems, checkoutItemToRemove);
  return setCartItems(newCartItems);
};

export const clearCartItems = withMatcher((): ClearCartItems => {
  return createAction(CART_ACTION_TYPE.CLEAR_CART);
});
