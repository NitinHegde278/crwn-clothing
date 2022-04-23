import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 75%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto 0;
  @media screen and (max-width: 800px) {
    width: 85%;
  }

  @media screen and (max-width: 350px) {
    width: 90%;
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;

  @media screen and (max-width: 350px) {
    width: 115%;
`;
export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 2%;

  &:last-child {
    width: 8%;
  }

  @media screen and (max-width: 800px) {
    width: 22%;
    padding: 0;
    &:last-child {
      width: 12%;
    }
`;

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;

  @media screen and (max-width: 800px) {
    font-size: 25px;
    margin-bottom: 40px;
  }
`;
