import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../../store/cart/cart.action";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  FormContainer,
  PaymentButton,
  PaymentFormContainer,
} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);

    fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    })
      .then((intent) => intent.json())
      .then((res) => {
        const clientSecret = res.paymentIntent.client_secret;
        stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: currentUser ? currentUser.displayName : "Guest",
              },
            },
          })
          .then((resp) => {
            console.log(resp);
            setIsProcessingPayment(false);
            if (
              resp &&
              resp.paymentIntent &&
              resp.paymentIntent.status === "succeeded"
            ) {
              dispatch(clearCartItems());
              alert("Payment successful");
            } else if (resp && resp.error) {
              alert(resp.error.message);
            }
          })
          .catch((error) => {
            setIsProcessingPayment(false);
            alert(error.message);
          });
      });
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={paymentHandler}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
