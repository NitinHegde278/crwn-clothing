import styled from "styled-components";

export const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectedCategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 30px;
  }

  @media screen and (max-width: 390px) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 20px;
  }
`;

export const Title = styled.h1`
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border: 1.5px solid;
  border-radius: 8px;
  padding: 5px;
`;
