import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, removeItemFromCheckout } =
    useContext(CartContext);

  const incrementHandler = (cartItem) => {
    addItemToCart(cartItem);
  };
  const decrementHandler = (cartItem) => {
    removeItemFromCart(cartItem);
  };

  const removeHandler = (cartItem) => {
    removeItemFromCheckout(cartItem);
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={() => decrementHandler(cartItem)}>&#10094;</Arrow>
        <Value className="value">{quantity}</Value>
        <Arrow onClick={() => incrementHandler(cartItem)}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{`${quantity} x ${price} = ${quantity * price}`}</BaseSpan>
      <RemoveButton onClick={() => removeHandler(cartItem)}>
        &#10006;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
