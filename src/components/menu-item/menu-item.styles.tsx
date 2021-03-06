import styled from "styled-components";
import { css } from "styled-components";

type BackgroundImageProps = {
  imageUrl: string;
};

export const BackgroundImage = styled.div<BackgroundImageProps>`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-image: url(${({ imageUrl }) => imageUrl});
`;

export const Content = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;

  @media screen and (min-width: 620px) and (max-width: 720px) {
    width: 140px;
  }
`;

type MenuItemContainerProps = {
  size?: string;
};

export const MenuItemContainer = styled.div<MenuItemContainerProps>`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;

  &:hover {
    cursor: pointer;

    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 4s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${Content} {
      opacity: 0.9;
    }
  }
  h1 {
    font-weight: bold;
    margin-bottom: 6px;
    font-size: 22px;
    color: #4a4a4a;
    text-transform: upperCase;
  }

  span {
    font-weight: lighter;
    font-size: 16px;
  }

  &${({ size }) =>
      size &&
      css`
        height: 380px;
      `}
    &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  @media screen and (max-width: 800px) {
    width: 200px;
  }
`;
