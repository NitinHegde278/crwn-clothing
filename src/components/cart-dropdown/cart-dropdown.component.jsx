import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItems } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    if (cartItems.length) {
      navigate("/checkout");
    } else {
      alert("Cart is empty!");
    }
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} cartItem={cartItem} />;
          })
        ) : (
          <span>Your cart is empty! Start adding items</span>
        )}
      </CartItems>
      <Button
        onClick={goToCheckoutHandler}
        buttonType={BUTTON_TYPE_CLASSES.base}
      >
        GO TO CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
