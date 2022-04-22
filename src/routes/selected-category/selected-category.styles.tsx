import styled from "styled-components";

export const SelectedCategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 390px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Title = styled.h1`
  margin: 15px 46%;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;
