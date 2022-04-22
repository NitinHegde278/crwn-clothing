import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -80px;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 400px;

  @media screen and (max-width: 800px) {
    padding: 20px;
    min-width: unset;
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
  margin-bottom: 60px;
`;
