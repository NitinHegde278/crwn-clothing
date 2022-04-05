import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  removeItemFromCheckout,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
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
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price, quantity } = cartItem;

  const incrementHandler = (cartItem) => {
    dispatch(addItemToCart(cartItems, cartItem));
  };
  const decrementHandler = (cartItem) => {
    dispatch(removeItemFromCart(cartItems, cartItem));
  };

  const removeHandler = (cartItem) => {
    dispatch(removeItemFromCheckout(cartItems, cartItem));
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
