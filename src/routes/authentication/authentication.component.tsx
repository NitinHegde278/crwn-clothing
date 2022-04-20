import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from "./authentication.styles";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserIsLoading,
} from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../../components/spinner/spinner.component";

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserIsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return isLoading ? (
    <Spinner />
  ) : (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
