import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPE {
  SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
  UPDATE_CART = "cart/UPDATE_CART",
  CLEAR_CART = "cart/CLEAR_CART",
}

export type CartItem = CategoryItem & {
  quantity: number;
};
