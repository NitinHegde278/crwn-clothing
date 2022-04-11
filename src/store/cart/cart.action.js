import { createAction } from "../../utils/reducer/reducer.utils";
import CART_ACTION_TYPE from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) => {
      return cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem;
    });
  } else {
    return cartItems;
  }
};

const removeFromCheckout = (cartItems, checkoutItemToRemove) => {
  return cartItems.filter(
    (cartItem) => cartItem.id !== checkoutItemToRemove.id
  );
};

export const setIsCartOpen = (isCartOpen) => {
  return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, isCartOpen);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPE.UPDATE_CART, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPE.UPDATE_CART, newCartItems);
};

export const removeItemFromCheckout = (cartItems, checkoutItemToRemove) => {
  const newCartItems = removeFromCheckout(cartItems, checkoutItemToRemove);
  return createAction(CART_ACTION_TYPE.UPDATE_CART, newCartItems);
};

export const clearCartItems = () => {
  return createAction(CART_ACTION_TYPE.CLEAR_CART);
};
