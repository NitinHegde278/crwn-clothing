import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    if (cartItems.length) {
      navigate("/checkout");
    } else {
      alert("Cart is empty!");
    }
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length
          ? cartItems.map((cartItem) => {
              return <CartItem key={cartItem.id} cartItem={cartItem} />;
            })
          : "Your cart is empty! Start adding items"}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
