import { Fragment, useContext, useEffect } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
  const { cartItems, cartTotal, setIsCartOpen } = useContext(CartContext);

  useEffect(() => {
    setIsCartOpen(false);
  }, []);

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
