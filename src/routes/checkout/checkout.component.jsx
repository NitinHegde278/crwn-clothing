import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(setIsCartOpen(false));
  }, [dispatch]);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.length ? (
        <Fragment>
          {cartItems.map((cartItem) => {
            return <CheckoutItem cartItem={cartItem} key={cartItem.id} />;
          })}
          <Total>Total: ${cartTotal}</Total>
        </Fragment>
      ) : (
        "Your cart is empty!!!"
      )}
    </CheckoutContainer>
  );
};

export default Checkout;
