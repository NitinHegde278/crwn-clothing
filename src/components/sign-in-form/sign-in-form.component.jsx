import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          alert("Google authentication failed. Try again");
          break;

        default:
          console.log(error);
          break;
      }
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    signInAuthUserWithEmailAndPassword(email, password)
      .then(() => {
        resetFormFields();
        navigate("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            alert(
              "User not found. Please retry or sign up if you don't have an account"
            );
            break;
          case "auth/wrong-password":
            alert(
              "Password entered is invalid. Please retry with right password"
            );
            break;
          default:
            console.log(error);
            break;
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account ?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
            Sign In
          </Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
