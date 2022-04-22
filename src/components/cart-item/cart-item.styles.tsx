import styled from "styled-components";

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;

  img {
    width: 30%;

    @media screen and (max-width: 720px) {
      max-width: 60%;
    }

    @media screen and (max-width: 500px) {
      min-width: 70%;
    }
  }

  @media screen and (max-width: 720px) {
    height: 25%;
    width: 100%;
    margin-left: 80px;
  }

  @media screen and (max-width: 500px) {
    width: 70%;
    margin-left: 50px;
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;

  span {
    font-size: 16px;
  }

  @media screen and (max-width: 500px) {
    padding: 10px 10px;
    height: 180px;
  }

  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;
